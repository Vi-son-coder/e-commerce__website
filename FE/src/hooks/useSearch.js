import { useEffect, useState } from "react";
import { request } from "../api/request.api";
import { useLocation } from "react-router-dom";

export function useSearch() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    async function searchProducts() {
      try {
        const res = await request({
          reqPATH: "/products/search",
          data: { keyword: keyword },
        });
        const data = await res.json();
        setResult(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    searchProducts();
  }, [keyword]);
  return { result, keyword };
}
