from collections import defaultdict
import math
import os

from fastapi import FastAPI, HTTPException
from mlxtend.frequent_patterns import apriori, association_rules
from pymongo import MongoClient
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from bson import ObjectId

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


def load_apriori_transactions(product_ids):
    known_product_ids = set(product_ids)
    transactions = []

    for user in users_collection.find({}, {"cart": 1}):
        cart = user.get("cart") or []
        if not isinstance(cart, list):
            continue

        product_set = {
            str(item.get("_id"))
            for item in cart
            if isinstance(item, dict)
            and item.get("_id") is not None
            and str(item.get("_id")) in known_product_ids
        }
        if len(product_set) > 1:
            transactions.append(product_set)

    session_products = defaultdict(set)
    behaviors = user_behavior_collection.find(
        {
            "actionType": {"$in": ["VIEW_PRODUCT", "ADD_TO_CART"]},
            "sessionId": {"$ne": None},
            "targetId": {"$ne": None},
        },
        {"sessionId": 1, "targetId": 1},
    )
    for behavior in behaviors:
        session_id = behavior.get("sessionId")
        product_id = str(behavior.get("targetId"))
        if session_id and product_id in known_product_ids:
            session_products[session_id].add(product_id)

    transactions.extend(
        product_set
        for product_set in session_products.values()
        if len(product_set) > 1
    )
    return transactions


def get_apriori_scores(product_ids, seed_product_id=None):
    transactions = load_apriori_transactions(product_ids)
    if not transactions:
        return {}

    transaction_products = sorted(set().union(*transactions))
    if len(transaction_products) < 2:
        return {}

    encoded_transactions = pd.DataFrame(
        [
            {
                product_id: product_id in transaction
                for product_id in transaction_products
            }
            for transaction in transactions
        ]
    )
    frequent_itemsets = apriori(
        encoded_transactions,
        min_support=max(1 / len(transactions), 0.01),
        use_colnames=True,
        max_len=3,
    )
    if frequent_itemsets.empty or not frequent_itemsets["itemsets"].map(len).gt(1).any():
        return {}

    rules = association_rules(
        frequent_itemsets,
        metric="confidence",
        min_threshold=0.1,
        return_metrics=["support", "confidence", "lift"],
    )
    scores = {}
    for rule in rules.itertuples():
        if seed_product_id and seed_product_id not in rule.antecedents:
            continue

        rule_score = float(rule.confidence) * float(rule.lift)
        if not math.isfinite(rule_score):
            continue
        if seed_product_id is None:
            rule_score *= float(rule.support)

        for product_id in rule.consequents:
            if product_id != seed_product_id:
                scores[product_id] = max(scores.get(product_id, 0), rule_score)

    return scores


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

        apriori_scores = get_apriori_scores(product_ids)
        max_interaction_score = max(scores.values(), default=0)
        max_apriori_score = max(apriori_scores.values(), default=0)

        def homepage_score(product):
            product_id = str(product["_id"])
            interaction_score = (
                scores[product_id] / max_interaction_score
                if max_interaction_score
                else 0
            )
            apriori_score = (
                apriori_scores.get(product_id, 0) / max_apriori_score
                if max_apriori_score
                else 0
            )
            rating_score = min(float(product.get("rating") or 0) / 5, 1)
            return (
                0.45 * apriori_score
                + 0.35 * interaction_score
                + 0.2 * rating_score,
                rating_score,
            )

        products.sort(key=homepage_score, reverse=True)
        recommendations = products[:limit]
        for product in recommendations:
            product["_id"] = str(product["_id"])

        return {
            "success": True,
            "source": "Apriori_Interaction_Ranking" if apriori_scores else "MongoDB_Interaction_Ranking",
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
        ncf_ranked_ids = []
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
                        ncf_ranked_ids.append(curr_id)

        apriori_scores = get_apriori_scores(item_ids, seed_product_id=product_id)
        ncf_scores = {
            candidate_id: 1 - rank / max(len(ncf_ranked_ids), 1)
            for rank, candidate_id in enumerate(ncf_ranked_ids)
        }
        max_apriori_score = max(apriori_scores.values(), default=0)
        candidate_ids = set(ncf_scores) | set(apriori_scores)
        recommendations = sorted(
            candidate_ids,
            key=lambda candidate_id: (
                0.65 * ncf_scores.get(candidate_id, 0)
                + 0.35
                * (
                    apriori_scores.get(candidate_id, 0) / max_apriori_score
                    if max_apriori_score
                    else 0
                )
            ),
            reverse=True,
        )[:7]

        # Truy vấn thông tin chi tiết sản phẩm từ MongoDB
        recommended_products = fetch_products_by_ids(recommendations)

        if not recommended_products:
            return fallback_popular_products(product_id)

        return {
            "success": True,
            "source": "Hybrid_NCF_Apriori" if apriori_scores else "Deep_Learning_NCF",
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

    products = list(products_collection.find(
        {"status": "active", "deleted": False},
        {"_id": 1, "title": 1, "brand": 1, "price": 1, "discountPercentage": 1, "rating": 1, "images": 1, "category": 1}
    ))
    product_ids = [str(product["_id"]) for product in products]
    apriori_scores = get_apriori_scores(product_ids, seed_product_id=current_product_id)
    products = [product for product in products if product["_id"] != query_id]
    products.sort(
        key=lambda product: (
            apriori_scores.get(str(product["_id"]), 0),
            float(product.get("rating") or 0),
        ),
        reverse=True,
    )
    popular = products[:7]

    for p in popular:
        p["_id"] = str(p["_id"])

    return {
        "success": True,
        "source": "Fallback_Apriori_Popular" if apriori_scores else "Fallback_Popular",
        "recommendations": popular
    }