import pandas as pd
import pyodbc
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder

def run_apriori_training():
    print("--- [AI APRIORI] BẮT ĐẦU CHẠY THUẬT TOÁN TÌM SẢN PHẨM MUA KÈM ---")
    
    # 1. Kết nối cơ sở dữ liệu SQL Server với tên database mới
    conn_str = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=CAVANNAM\\MSSQLSERVER01;"
        "DATABASE=ecommerce_db;"  # Khớp với database mới tạo
        "Trusted_Connection=yes;"
    )
    conn = pyodbc.connect(conn_str)
    
    # Lấy lịch sử sản phẩm từ bảng CHITIETDONHANG
    query = "SELECT order_id, product_id FROM CHITIETDONHANG"
    df = pd.read_sql(query, conn)
    
    if df.empty:
        print("Cảnh báo: Chưa có dữ liệu đơn hàng (`CHITIETDONHANG`) để chạy Apriori!")
        conn.close()
        return

    # 2. Gom nhóm các sản phẩm theo từng mã đơn hàng
    basket = df.groupby('order_id')['product_id'].apply(list).tolist()
    
    # 3. Mã hóa giao dịch thành ma trận One-hot
    te = TransactionEncoder()
    te_ary = te.fit(basket).transform(basket)
    basket_df = pd.DataFrame(te_ary, columns=te.columns_)
    
    # 4. Chạy thuật toán Apriori tìm tập sản phẩm phổ biến
    frequent_itemsets = apriori(basket_df, min_support=0.01, use_colnames=True)
    
    if frequent_itemsets.empty:
        print("Không tìm thấy tập phổ biến nào với mức Support hiện tại.")
        conn.close()
        return

    # 5. Sinh luật kết hợp dựa trên chỉ số Confidence
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.2)
    print(f"Đã khai thác thành công {len(rules)} luật kết hợp.")
    
    # 6. Lưu kết quả luật vào bảng AI_APRIORI_RULES trong SQL Server
    cursor = conn.cursor()
    cursor.execute("DELETE FROM AI_APRIORI_RULES") # Xóa dữ liệu cũ để cập nhật luật mới nhất
    
    for _, row in rules.iterrows():
        for ant in row['antecedents']:
            for cons in row['consequents']:
                confidence = float(row['confidence'])
                support = float(row['support']) if 'support' in row else None
                lift = float(row['lift']) if 'lift' in row else None
                
                cursor.execute(
                    "INSERT INTO AI_APRIORI_RULES (product_id, bought_with_product_id, support, confidence, lift) VALUES (?, ?, ?, ?, ?)",
                    (int(ant), int(cons), support, confidence, lift)
                )
    
    conn.commit()
    conn.close()
    print("--- [AI APRIORI] HOÀN TẤT HUẤN LUYỆN VÀ LƯU KẾT QUẢ VÀO CSDL ---")

if __name__ == "__main__":
    run_apriori_training()