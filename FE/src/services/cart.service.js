
import { request } from "../api/request.api";
import { getUser } from "../data/data";

const userId = JSON.parse(localStorage.getItem("userId"));
export async function addToCart(productId, quantity) {
  try {
    const PATH = `/users/addToCart?id=${userId}`;
    const product = await request({
      reqPATH: `/products/search`,
      data: { id: productId },
    }).then((res) => res.json());
    const data = {
      product: product,
      quantity: quantity,
    };
    const res = await request({
      reqPATH: PATH,
      method: "PATCH",
      data: data,
    });
    const updateCartInUsers = await res.json();
    return { data: updateCartInUsers, ok: res.ok };
  } catch (error) {
    console.log(error);
  }
}

export async function removeFromCart(productId) {
  try {
    const updateCartInUsers = await request({
      reqPATH: `/users/removeFromCart?id=${userId}`,
      method: "DELETE",
      data: { productId: productId },
    }).then((p) => p.json());
    return updateCartInUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductInCartInUser(dataUpdate) {
  try {
    const updateProductInCart = await request({
      reqPATH: `/users/updateProductInCart?id=${userId}`,
      method: "PATCH",
      data: dataUpdate,
    }).then((p) => p);
    return updateProductInCart;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsInCart() {
  const user = await getUser();
  let productsInCart = user[0].cart;
  return productsInCart;
}

