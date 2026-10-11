import torch
import torch.nn as nn
import torch.optim as optim
import pandas as pd
import pyodbc

# Định nghĩa kiến trúc mạng NCF (Neural Collaborative Filtering)
class NCF(nn.Module):
    def __init__(self, num_users, num_items, latent_dim=8):
        super(NCF, self).__init__()
        # Embedding ma trận cho User và Item
        self.user_embedding = nn.Embedding(num_users, latent_dim)
        self.item_embedding = nn.Embedding(num_items, latent_dim)
        
        # Các lớp ẩn MLP (Multi-Layer Perceptron) học tương tác phi tuyến tính
        self.fc1 = nn.Linear(latent_dim * 2, 16)
        self.fc2 = nn.Linear(16, 1)
        self.sigmoid = nn.Sigmoid() # Trả về xác suất giá trị từ 0 đến 1

    def forward(self, user_indices, item_indices):
        u_embed = self.user_embedding(user_indices)
        i_embed = self.item_embedding(item_indices)
        
        # Ghép nối vector embedding của người dùng và sản phẩm lại
        x = torch.cat([u_embed, i_embed], dim=-1)
        x = torch.relu(self.fc1(x))
        x = self.sigmoid(self.fc2(x))
        return x.squeeze()

def run_ncf_training():
    print("--- [AI NCF] BẮT ĐẦU HUẤN LUYỆN MÔ HÌNH DEEP LEARNING ---")
    
    # 1. Kết nối CSDL lấy lịch sử tương tác từ bảng USER_BEHAVIER
    conn_str = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=CAVANNAM\\MSSQLSERVER01;"
        "DATABASE=ecommerce_db;"  
        "Trusted_Connection=yes;"
    )
    conn = pyodbc.connect(conn_str)
    
    # Sử dụng đúng tên bảng USER_BEHAVIER và cột behavior_type
    query = "SELECT user_id, product_id, behavior_type FROM USER_BEHAVIER"
    df = pd.read_sql(query, conn)
    
    if df.empty:
        print("Cảnh báo: Chưa có dữ liệu tương tác (`USER_BEHAVIER`) để train NCF!")
        conn.close()
        return

    # 2. Mã hóa ID dạng số nguyên/chữ thành dạng chỉ số index
    user_list = df['user_id'].unique()
    item_list = df['product_id'].unique()
    
    user_to_idx = {u: i for i, u in enumerate(user_list)}
    item_to_idx = {it: i for i, it in enumerate(item_list)}
    
    df['user_idx'] = df['user_id'].map(user_to_idx)
    df['item_idx'] = df['product_id'].map(item_to_idx)
    df['label'] = 1  # Gán nhãn phản hồi tích cực (Implicit feedback)
    
    num_users = len(user_list)
    num_items = len(item_list)
    
    # 3. Khởi tạo mô hình NCF, hàm mất mát (BCELoss) và thuật toán tối ưu (Adam)
    model = NCF(num_users, num_items, latent_dim=8)
    criterion = nn.BCELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.01)
    
    users_tensor = torch.tensor(df['user_idx'].values, dtype=torch.long)
    items_tensor = torch.tensor(df['item_idx'].values, dtype=torch.long)
    labels_tensor = torch.tensor(df['label'].values, dtype=torch.float32)
    
    # 4. Quá trình huấn luyện mô hình qua các vòng lặp (Epochs)
    model.train()
    for epoch in range(5):
        optimizer.zero_grad()
        predictions = model(users_tensor, items_tensor)
        loss = criterion(predictions, labels_tensor)
        loss.backward()
        optimizer.step()
        print(f"Epoch {epoch+1}/5 - Mức độ mất mát (Loss): {loss.item():.4f}")
        
    # 5. Dự đoán điểm số phù hợp và lưu kết quả vào bảng PRODUCT_RECOMMENDATIONS
    model.eval()
    cursor = conn.cursor()
    
    # Xóa dữ liệu gợi ý cũ của model_id = 1 (Collaborative Filtering)
    cursor.execute("DELETE FROM PRODUCT_RECOMMENDATIONS WHERE model_id = 1")
    
    with torch.no_grad():
        for u_orig, u_idx in user_to_idx.items():
            for it_orig, it_idx in item_to_idx.items():
                u_t = torch.tensor([u_idx], dtype=torch.long)
                it_t = torch.tensor([it_idx], dtype=torch.long)
                score = model(u_t, it_t).item()
                
                # Lưu vào bảng PRODUCT_RECOMMENDATIONS (model_id = 1 ứng với Collaborative Filtering)
                cursor.execute(
                    "INSERT INTO PRODUCT_RECOMMENDATIONS (user_id, product_id, model_id, score) VALUES (?, ?, 1, ?)",
                    (int(u_orig), int(it_orig), float(score))
                )
                
    conn.commit()
    conn.close()
    print("--- [AI NCF] HOÀN TẤT HUẤN LUYỆN VÀ LƯU KẾT QUẢ VÀO SQL SERVER ---")

if __name__ == "__main__":
    run_ncf_training()