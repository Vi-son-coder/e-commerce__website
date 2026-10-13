import { useState, useEffect } from "react";
import { request } from "../api/request.api";

export function useProducts(data = null) {
  const [products, setProducts] = useState();
  let PATH = "/products";
 
  useEffect(() => {
    async function getProducts() {
      const Data = await request({ reqPATH: PATH, data:data });
      setProducts(Data);
    }
    getProducts();
  }, []);

  return { products };
}
