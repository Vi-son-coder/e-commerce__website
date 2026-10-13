import { useEffect, useState } from "react";
import { request } from "../api/request.api";

export function useAddToCart() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const userId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
    async function addToCart() {
      try {
        const PATH = `/users/add?id=${userId}`;
        const product = await request({
          reqPATH: `/products/search`,
          data: { id: productId },
        });
        const data = {
          product: product,
          quantity: quantity,
        };
        const dataProduct = await request({
          reqPATH: PATH,
          method: "PATCH",
          data: data,
        });
        return dataProduct;
      } catch (error) {
        console.log(error);
      }
    }
    addToCart();
  }, [productId,quantity]);
  return { setProductId, setQuantity };
}
