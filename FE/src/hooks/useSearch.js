import { useEffect, useState } from "react";
import { request } from "../api/request.api";
import { useLocation } from "react-router-dom";

export function useSearch() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    //setTimeout dùng để tạo khoảng chờ khi user nhập keyword tránh vc call api liên tục
    async function searchProducts (){
      try {
        const data = await request({
          reqPATH: "/products/search",
          data: { keyword: keyword },
        });
        setResult(data);
      } catch (error) {
        console.log(error);
      }
    };
    searchProducts();
  }, [keyword]);
  return { result , keyword};
}
