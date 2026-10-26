from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from bson import ObjectId
import os

app = FastAPI(title="NCF Recommendation AI Service")

# Kết nối MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["products"]

users_collection = db["users"]
user_behavior_collection = db["User_behavior"]
products_collection = db["products"]


# 1. Định nghĩa Kiến trúc mô hình NCF (NeuMF: GMF + MLP)
class NCF(nn.Module):
    def __init__(self, num_users, num_items, latent_dim=16):
        super(NCF, self).__init__()
        # Embedding cho GMF
        self.user_embed_gmf = nn.Embedding(num_users, latent_dim)
        self.item_embed_gmf = nn.Embedding(num_items, latent_dim)
        
        # Embedding cho MLP
        self.user_embed_mlp = nn.Embedding(num_users, latent_dim)
        self.item_embed_mlp = nn.Embedding(num_items, latent_dim)
        
        # Các tầng Linear cho MLP
        self.mlp = nn.Sequential(
            nn.Linear(latent_dim * 2, 32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 16),
            nn.ReLU()
        )
        
        # Tầng kết hợp cuối cùng (NeuMF layer)
        self.prediction_layer = nn.Linear(latent_dim + 16, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, user_indices, item_indices):
        # GMF branch
        gmf_user = self.user_embed_gmf(user_indices)
        gmf_item = self.item_embed_gmf(item_indices)
        gmf_out = gmf_user * gmf_item
        
        # MLP branch
        mlp_user = self.user_embed_mlp(user_indices)
        mlp_item = self.item_embed_mlp(item_indices)
        mlp_vector = torch.cat([mlp_user, mlp_item], dim=-1)
        mlp_out = self.mlp(mlp_vector)
        
        # Concatenate GMF và MLP
        neural_vector = torch.cat([gmf_out, mlp_out], dim=-1)
        logits = self.prediction_layer(neural_vector)
        return self.sigmoid(logits)


def load_training_data():
    """Trích xuất dữ liệu tương tác từ users.cart và User_behavior để huấn luyện"""
    interactions = []

    # 1. Lấy từ giỏ hàng (users.cart) -> Gán nhãn tương tác mạnh = 1
    users = users_collection.find({}, {"_id": 1, "cart": 1})
    for user in users:
        user_id = str(user.get("_id"))
        cart = user.get("cart", [])
        for item in cart:
            item_id = str(item.get("_id"))
            if item_id:
                interactions.append((user_id, item_id, 1.0))

    # 2. Lấy từ User_behavior (VIEW_PRODUCT, v.v.) -> Gán nhãn tương tác = 0.5 hoặc 1
    behaviors = user_behavior_collection.find({"userId": {"$ne": None}, "targetId": {"$ne": None}})
    for b in behaviors:
        user_id = str(b.get("userId"))
        item_id = str(b.get("targetId"))
        interactions.append((user_id, item_id, 0.5))

    return interactions


@app.get("/")
def read_root():
    return {"status": "NCF Recommendation AI Service Running"}


@app.get("/recommendations/home")
def get_home_recommendations(limit: int = 7):
    try:
        limit = max(1, min(limit, 20))
        product_filter = {"status": "active", "deleted": False}
        projection = {
            "_id": 1,
            "title": 1,
            "brand": 1,
            "price": 1,
            "discountPercentage": 1,
            "rating": 1,
            "images": 1,
            "category": 1,
        }
        products = list(products_collection.find(product_filter, projection))
        if not products:
            return {
                "success": True,
                "source": "MongoDB_Interaction_Ranking",
                "recommendations": [],
            }

        product_ids = [str(product["_id"]) for product in products]
        scores = {product_id: 0 for product_id in product_ids}
        action_weights = {"VIEW_PRODUCT": 1, "ADD_TO_CART": 3}

        behaviors = user_behavior_collection.find(
            {"targetId": {"$in": product_ids}},
            {"targetId": 1, "actionType": 1},
        )
        for behavior in behaviors:
            product_id = behavior.get("targetId")
            scores[product_id] += action_weights.get(behavior.get("actionType"), 0)

        users = users_collection.find({}, {"cart": 1})
        for user in users:
            cart = user.get("cart") or []
            if not isinstance(cart, list):
                continue
            for item in cart:
                if isinstance(item, dict):
                    product_id = str(item.get("_id", ""))
                    if product_id in scores:
                        scores[product_id] += 3

        products.sort(
            key=lambda product: (
                scores[str(product["_id"])],
                float(product.get("rating") or 0),
            ),
            reverse=True,
        )
        recommendations = products[:limit]
        for product in recommendations:
            product["_id"] = str(product["_id"])

        return {
            "success": True,
            "source": "MongoDB_Interaction_Ranking",
            "recommendations": recommendations,
        }
    except Exception as error:
        print(f"Error loading homepage recommendations: {error}")
        raise HTTPException(status_code=500, detail="Unable to load recommendations")


@app.get("/recommendations/bought-together/{product_id}")
def get_ncf_recommendations(product_id: str):
    """
    Sử dụng NCF để dự đoán và gợi ý sản phẩm phù hợp dựa trên không gian vector ẩn
    """
    try:
        interactions = load_training_data()

        # Lấy danh sách toàn bộ sản phẩm có sẵn trong DB
        all_products = list(products_collection.find({}, {"_id": 1, "title": 1, "brand": 1, "price": 1, "discountPercentage": 1, "rating": 1, "images": 1, "category": 1}))
        if not all_products:
            return fallback_popular_products(product_id)

        item_ids = [str(p["_id"]) for p in all_products]
        
        # Nếu chưa đủ dữ liệu tương tác, dùng cơ chế fallback
        if len(interactions) < 3:
            return fallback_popular_products(product_id)

        # Tạo bảng mã hóa ánh xạ ID sang số nguyên (Index mapping)
        unique_users = list(set([i[0] for i in interactions]))
        user2id = {u: idx for idx, u in enumerate(unique_users)}
        item2id = {i: idx for idx, i in enumerate(item_ids)}

        # Chuẩn bị dữ liệu huấn luyện nhanh cho PyTorch
        valid_interactions = [
            (user2id[u], item2id[i], r) for u, i, r in interactions 
            if u in user2id and i in item2id
        ]

        if not valid_interactions:
            return fallback_popular_products(product_id)

        # Huấn luyện mô hình NCF thu nhỏ (Lightweight training on-the-fly)
        num_users = len(user2id)
        num_items = len(item2id)
        
        model = NCF(num_users, num_items, latent_dim=8)
        criterion = nn.BCELoss()
        optimizer = optim.Adam(model.parameters(), lr=0.01)

        users_tensor = torch.tensor([x[0] for x in valid_interactions], dtype=torch.long)
        items_tensor = torch.tensor([x[1] for x in valid_interactions], dtype=torch.long)
        labels_tensor = torch.tensor([x[2] for x in valid_interactions], dtype=torch.float)

        # Train nhanh trong vài epochs
        model.train()
        for epoch in range(5):
            optimizer.zero_grad()
            predictions = model(users_tensor, items_tensor).squeeze()
            loss = criterion(predictions, labels_tensor)
            loss.backward()
            optimizer.step()

        # Dự đoán điểm số cho sản phẩm hiện tại (`product_id`) với các sản phẩm khác
        model.eval()
        recommendations = []
        if product_id in item2id:
            target_item_idx = item2id[product_id]
            # Lấy đại diện user đầu tiên hoặc user mặc định để tính điểm tương quan item-item thông qua embedding
            dummy_user_tensor = torch.tensor([0] * len(item2id), dtype=torch.long)
            item_indices_tensor = torch.tensor(list(range(len(item2id))), dtype=torch.long)
            
            with torch.no_grad():
                # Tính độ tương đồng embedding giữa target_item và các item khác
                item_embeds = model.item_embed_gmf(item_indices_tensor)
                target_embed = item_embeds[target_item_idx]
                scores = torch.matmul(item_embeds, target_embed) # Cosine/Dot product similarity trong không gian tiềm ẩn
                
                # Sắp xếp lấy điểm cao nhất (loại bỏ chính nó)
                top_indices = torch.argsort(scores, descending=True).tolist()
                
                for idx in top_indices:
                    curr_id = item_ids[idx]
                    if curr_id != product_id:
                        recommendations.append(curr_id)
                    if len(recommendations) >= 7:
                        break

        # Truy vấn thông tin chi tiết sản phẩm từ MongoDB
        recommended_products = fetch_products_by_ids(recommendations[:7])

        if not recommended_products:
            return fallback_popular_products(product_id)

        return {
            "success": True,
            "source": "Deep_Learning_NCF",
            "recommendations": recommended_products
        }

    except Exception as e:
        print(f"Error in NCF AI Service: {str(e)}")
        return fallback_popular_products(product_id)


def fetch_products_by_ids(product_ids):
    """Lấy thông tin chi tiết sản phẩm từ MongoDB"""
    query_ids = []
    for pid in product_ids:
        try:
            query_ids.append(ObjectId(pid))
        except Exception:
            query_ids.append(pid)

    products = list(products_collection.find(
        {"$or": [{"_id": {"$in": query_ids}}, {"_id": {"$in": product_ids}}]},
        {"_id": 1, "title": 1, "brand": 1, "price": 1, "discountPercentage": 1, "rating": 1, "images": 1, "category": 1}
    ))

    for p in products:
        p["_id"] = str(p["_id"])
    
    # Sắp xếp lại theo đúng thứ tự id truyền vào
    product_map = {p["_id"]: p for p in products}
    ordered_products = [product_map[pid] for pid in product_ids if pid in product_map]
    return ordered_products


def fallback_popular_products(current_product_id: str):
    """Fallback: Trả về sản phẩm phổ biến khác nếu chưa đủ dữ liệu train NCF"""
    query_id = current_product_id
    try:
        query_id = ObjectId(current_product_id)
    except Exception:
        pass

    popular = list(products_collection.find(
        {"_id": {"$ne": query_id}},
        {"_id": 1, "title": 1, "brand": 1, "price": 1, "discountPercentage": 1, "rating": 1, "images": 1, "category": 1}
    ).limit(7))

    for p in popular:
        p["_id"] = str(p["_id"])

    return {
        "success": True,
        "source": "Fallback_Popular",
        "recommendations": popular
    }