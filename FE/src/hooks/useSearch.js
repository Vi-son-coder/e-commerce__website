import { useEffect, useState } from "react";
import { request } from "../api/request.api";
import { useLocation } from "react-router-dom";
import { convertVndToUsd } from "../utils/currency";

export function useSearch() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const query = location.search;
  const keyword = new URLSearchParams(query).get("keyword") || "";

  useEffect(() => {
    async function searchProducts() {
      try {
        const searchData = Object.fromEntries(new URLSearchParams(query));
        ["minPrice", "maxPrice"].forEach((key) => {
          if (searchData[key] !== undefined) {
            searchData[key] = String(convertVndToUsd(searchData[key]));
          }
        });
        const res = await request({
          reqPATH: "/products/search",
          data: searchData,
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
