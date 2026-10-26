import { useEffect, useState } from "react";
import { request } from "../api/request.api";
import { useLocation } from "react-router-dom";

export function useSearch() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const query = location.search;
  const keyword = new URLSearchParams(query).get("keyword") || "";

  useEffect(() => {
    async function searchProducts() {
      try {
        const res = await request({
          reqPATH: "/products/search",
          data: Object.fromEntries(new URLSearchParams(query)),
        });
        if (!res?.ok) throw new Error("Không thể tìm kiếm sản phẩm");
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.log(error);
      }
    }
    searchProducts();
  }, [query]);
  return { result, keyword };
}
