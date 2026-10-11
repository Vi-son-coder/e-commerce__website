from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pyodbc
import pandas as pd

# Khởi tạo ứng dụng FastAPI
app = FastAPI(title="NovaMart AI Recommendation API", version="1.0")

# Cấu hình CORS: Cho phép Frontend (React chạy ở cổng 5173) gọi được vào Backend (cổng 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    """
    Hàm khởi tạo kết nối đến SQL Server (database: ecommerce_db).
    """
    try:
        conn_str = (
            "DRIVER={ODBC Driver 17 for SQL Server};"
            "SERVER=CAVANNAM\\MSSQLSERVER01;" 
            "DATABASE=ecommerce_db;"            # Đã cập nhật đúng tên database mới
            "Trusted_Connection=yes;"        
        )
        return pyodbc.connect(conn_str)
    except Exception as e:
        print(f"Lỗi kết nối CSDL: {e}")
        return None

# ==========================================
# API 1: LẤY DANH SÁCH TOÀN BỘ SẢN PHẨM
# ==========================================
@app.get("/api/products")
def get_products():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Không thể kết nối CSDL")
    
    # Truy vấn từ bảng SANPHAM và map sang định dạng trường dữ liệu mà Frontend React đang hiển thị
    query = """
        SELECT 
            product_id AS id, 
            category_id, 
            product_name AS name, 
            'Apple/Samsung' AS brand, 
            price, 
            price * 1.2 AS old_price, 
            20 AS discount_percent, 
            quantity AS stock_quantity, 
            10 AS sold, 
            4.8 AS rating, 
            image AS image_url 
        FROM SANPHAM
    """
    
    df = pd.read_sql(query, conn)
    conn.close()
    
    return {
        "status": "success",
        "data": df.to_dict(orient="records")
    }

# ==========================================
# CẤU TRÚC DỮ LIỆU ĐẦU VÀO CHO API GỢI Ý
# ==========================================
class RecommendationRequest(BaseModel):
    user_id: Optional[str] = "2" # Sử dụng user_id dạng số (ví dụ: '2' ứng với khách hàng trong CSDL)
    product_id: Optional[str] = None  # ID của sản phẩm khách đang xem

# ==========================================
# API 2: BỘ NÃO AI GỢI Ý SẢN PHẨM (CORE)
# ==========================================
@app.post("/api/get-recommendations")
def get_recommendations(req: Optional[RecommendationRequest] = None):
    u_id = req.user_id if (req and req.user_id) else "2"
    p_id = req.product_id if (req and req.product_id) else None

    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Lỗi kết nối CSDL")
    
    recommended_ids = []
    ai_model = "NCF (Deep Learning)" 

    # -------------------------------------------------------------
    # LỚP 1: THUẬT TOÁN APRIORI (Gợi ý sản phẩm mua kèm từ bảng AI_APRIORI_RULES)
    # -------------------------------------------------------------
    if p_id:
        query = "SELECT TOP 6 bought_with_product_id FROM AI_APRIORI_RULES WHERE product_id = ? ORDER BY confidence DESC"
        df = pd.read_sql(query, conn, params=(p_id,))
        if not df.empty:
            recommended_ids = df['bought_with_product_id'].tolist()
            ai_model = "Apriori Rules (Mua kèm)"
    
    # -------------------------------------------------------------
    # LỚP 2: THUẬT TOÁN NCF (Cá nhân hóa từ bảng PRODUCT_RECOMMENDATIONS, model_id = 1)
    # -------------------------------------------------------------
    if not recommended_ids and u_id:
        query = "SELECT TOP 6 product_id FROM PRODUCT_RECOMMENDATIONS WHERE user_id = ? AND model_id = 1 ORDER BY score DESC"
        df = pd.read_sql(query, conn, params=(u_id,))
        if not df.empty:
            recommended_ids = df['product_id'].tolist()
            ai_model = "NCF (Cá nhân hóa)"
    
    # -------------------------------------------------------------
    # LỚP 3: FALLBACK (Lấy sản phẩm phổ biến từ bảng SANPHAM)
    # -------------------------------------------------------------
    if not recommended_ids:
        query = "SELECT TOP 6 product_id FROM SANPHAM" 
        df = pd.read_sql(query, conn)
        recommended_ids = df['product_id'].tolist()
        ai_model = "Sản phẩm phổ biến"

    conn.close()
    
    return {
        "status": 200,
        "ai_model_used": ai_model,
        "recommendation_ids": recommended_ids
    }