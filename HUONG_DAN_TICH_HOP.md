# Tích hợp FE (React) ↔ BE (Express) cho NovaMark

Gói này chỉ chứa **file mới / file đã sửa**, giữ nguyên đường dẫn. Chép đè lên project của bạn.

## Chạy thử
1. **DB**: chạy `e_com/SQLQuery1.sql` trong SSMS (nếu chưa).
2. **Backend** (`e_com`):
   ```bash
   npm install
   npm run seed:passwords -- Password@123   # BẮT BUỘC: seed đang để mật khẩu giả DEMO_HASH_*, không đăng nhập được nếu bỏ bước này
   npm run dev                              # http://localhost:3000
   ```
3. **Frontend** (`e-commerce__website-Nam/FE/home`):
   ```bash
   cp .env.example .env     # VITE_API_URL=http://localhost:3000
   npm install
   npm run dev              # http://localhost:5173
   ```
4. Đăng nhập thử: `son` / `Password@123` (hoặc `nguyenan`, `admin`).
5. Ảnh sản phẩm: DB lưu tên file (vd `iphone17.jpg`) → đặt file vào `e_com/public/images/`. Thiếu ảnh thì FE tự hiện ảnh placeholder.

## Đã nối những gì
| Chức năng | FE | API backend |
|---|---|---|
| Đăng nhập / đăng ký / đăng xuất, giữ phiên (JWT trong localStorage) | `AuthModal`, `AuthContext`, header | `POST /auth/login`, `/auth/register`, `GET /auth/me` |
| Danh mục (tab header, ô chọn khi tìm kiếm, "Khám phá danh mục") | header, content | `GET /categories` |
| Danh sách sản phẩm + lọc danh mục + tìm kiếm + phân trang | `content.jsx` | `GET /products?q&category_id&page&limit` (+ header `X-Total-Count`) |
| Chi tiết sản phẩm | `pages/ProductDetail.jsx` (`#/product/:id`) | `GET /products/:id` |
| Giỏ hàng (lưu localStorage, số lượng + tổng tiền trên header) | `CartContext`, `pages/Cart.jsx` | — (BE không có bảng giỏ) |
| Đặt hàng | `pages/Checkout.jsx` | `POST /orders/checkout` (giá & tồn kho do BE kiểm tra) |
| Đơn hàng của tôi | `pages/Orders.jsx` | `GET /orders/mine` |
| Gợi ý AI + "Làm mới gợi ý" | `content.jsx` | `GET /recommendations/user/:id`, `POST /recommendations/generate/:id` |
| Ghi hành vi cho hệ thống đề xuất | `add_to_cart` khi thêm giỏ; `view` (kèm thời gian xem) khi rời trang chi tiết; `purchase` do BE tự ghi khi checkout | `POST /behavior` |

## Thay đổi ở backend (duy nhất 1)
`server.js`: thêm `app.use("/images", express.static("public/images"))` để phục vụ ảnh sản phẩm.

## Chưa làm / lưu ý
- Giảm giá %, đánh giá sao, lượt bán, "Yêu thích": **schema DB chưa có** nên các phần này được ẩn (component `Product` vẫn nhận các prop cũ, hiện lại khi có dữ liệu).
- Thanh toán online chỉ là mô phỏng (`pay:true` ghi một dòng `THANHTOAN`), chưa có cổng thanh toán. Đơn hàng chưa có cột trạng thái vận chuyển nên chưa có trang theo dõi vận chuyển.
- Hero banner, mã giảm giá, "Deal chớp nhoáng" vẫn là nội dung tĩnh.
- Nên đặt `PROTECT_ROUTES=true` trong `.env` backend khi triển khai (FE đã gửi sẵn token nên vẫn chạy).
- Các cột chữ trong DB là `VARCHAR` (không phải `NVARCHAR`) nên tiếng Việt có dấu có thể bị lỗi/mất dấu; seed hiện dùng tên không dấu ("Dien thoai"...).
