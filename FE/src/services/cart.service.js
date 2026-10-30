
import { request } from "../api/request.api";

export const CART_CHANGED_EVENT = "nova-cart-changed";

function notifyCartChanged() {
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

export async function addToCart(productId, quantity) {
  const productResponse = await request({
    reqPATH: "/products/search",
    data: { id: productId },
  });
  if (!productResponse.ok) {
    throw new Error("Không thể tải thông tin sản phẩm");
  }
  const product = await productResponse.json();
  const response = await request({
    reqPATH: "/users/addToCart",
    method: "PATCH",
    data: { product, quantity },
  });
  const data = await response.json();
  if (response.ok) notifyCartChanged();
  return { data, ok: response.ok };
}

export async function removeFromCart(productId) {
  const response = await request({
    reqPATH: "/users/removeFromCart",
    method: "DELETE",
    data: { productId },
  });
  const data = await response.json();
  if (response.ok) notifyCartChanged();
  return data;
}

export async function updateProductInCartInUser(dataUpdate) {
  const response = await request({
    reqPATH: "/users/updateProductInCart",
    method: "PATCH",
    data: dataUpdate,
  });
  if (response.ok) notifyCartChanged();
  return response;
}

export async function getProductsInCart() {
  const response = await request({ reqPATH: "/users/me" });
  if (response.status === 401) return [];
  if (!response.ok) throw new Error("Không thể tải giỏ hàng");
  const data = await response.json();
  return data.cart || [];
}
