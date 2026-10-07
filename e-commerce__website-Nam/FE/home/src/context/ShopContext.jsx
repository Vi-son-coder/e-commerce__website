import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

// Danh mục + bộ lọc dùng chung giữa Header (tab danh mục, ô tìm kiếm) và trang chủ.
const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ categoryId: null, q: "" });

  useEffect(() => {
    api.categories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const value = useMemo(
    () => ({
      categories,
      filters,
      setFilters,
      categoryName: (id) => categories.find((c) => c.category_id === id)?.category_name ?? "",
    }),
    [categories, filters]
  );
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);
