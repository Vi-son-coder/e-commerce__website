import { request } from "../api/request.api";

export async function searchCategory({ data = null }) {
  const res = await request({ reqPATH: "/products/search", data: data });
  if (!res?.ok) {
    throw new Error(`Không thể tìm sản phẩm theo danh mục (${res?.status})`);
  }
  const products = await res.json();
  if (!Array.isArray(products)) {
    throw new Error("Dữ liệu sản phẩm theo danh mục không hợp lệ");
  }
  return products;
}
