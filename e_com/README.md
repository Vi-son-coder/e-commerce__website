# E-commerce API (Express + Prisma 7 + SQL Server)

## Chạy
```bash
npm install
# 1. chạy SQLQuery1.sql trong SSMS để tạo DB + dữ liệu mẫu
# 2. điền .env (xem .env.example), đặc biệt JWT_SECRET
npm run seed:passwords -- Password@123   # đặt mật khẩu thật cho tài khoản demo (admin, son, nguyenan)
npm run dev                              # http://localhost:3000
npm test
```

## Endpoint mới
| Method | Path | Mô tả |
|---|---|---|
| POST | /auth/register, /auth/login | trả `{ token, user }` |
| GET | /auth/me | cần `Authorization: Bearer <token>` |
| POST | /orders/checkout | đặt hàng: `{ shipping_address, items:[{product_id,quantity}], pay? }` – 1 transaction, giá lấy từ DB, trừ kho, ghi hành vi `purchase` |
| GET | /orders/mine | đơn của người đang đăng nhập |
| POST | /recommendations/generate/:userId | sinh gợi ý (item-based CF) từ `USER_BEHAVIER`, ghi vào `PRODUCT_RECOMMENDATIONS` |
| POST | /ai-models/:id/train | snapshot hành vi mới vào `DATA_TRAINING`, cập nhật `trained_date` |
| GET | /products?q=&category_id=&min_price=&max_price=&in_stock=true&sort=price&order=desc&page=1&limit=20 | tìm kiếm/lọc/phân trang; tổng số ở header `X-Total-Count` |
| GET | /health | kiểm tra DB |

## Đã sửa/bổ sung
- `order-details` tạo/sửa/xóa tự cập nhật `DONHANG.total_amount`.
- `DELETE /orders/:id` xóa kèm thanh toán + chi tiết (trước đây bị lỗi FK 409); `?restock=true` để hoàn kho.
- `DELETE /products/:id?soft=true` để ẩn sản phẩm đã có đơn thay vì xóa.
- `PROTECT_ROUTES=true` bật yêu cầu đăng nhập/admin cho các route CRUD (admin = username trong `ADMIN_USERNAMES`).
- CORS, graceful shutdown, `PORT` từ env, `prisma.config.ts` (Prisma 7 chỉ tự nhận tên này) và `DATABASE_URL` cho Prisma CLI.
