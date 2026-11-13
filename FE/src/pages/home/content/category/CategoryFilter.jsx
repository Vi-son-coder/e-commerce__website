import { useLocation } from "react-router-dom";
import Product from "../../../../components/ComponentTemplates/products/products";
import { searchCategory } from "../../../../services/search.service";
import { useEffect, useState } from "react";
import { trackAction } from "../../../../services/tracking.service";

export default function CatgoryFilter() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const category = search.get("category");
  const categoryName = search.get("categoryName") || category;
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isActive = true;

    async function getProducts() {
      setStatus("loading");
      try {
        const searchProducts = await searchCategory({
          data: { category, categoryName },
        });
        if (!isActive) return;
        setProducts(searchProducts);
        setStatus(searchProducts.length ? "ready" : "empty");
        trackAction("CLICK_CATEGORY", category);
      } catch (error) {
        if (!isActive) return;
        console.error("Lỗi tìm sản phẩm theo danh mục:", error);
        setStatus("error");
      }
    }

    getProducts();
    return () => {
      isActive = false;
    };
  }, [category, categoryName]);

  return (
    <main className="product-list-page mx-auto w-full max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        Danh mục: {categoryName}
      </h1>
      {status === "loading" && (
        <p className="py-8 text-center text-gray-500">Đang tìm sản phẩm...</p>
      )}
      {status === "error" && (
        <p className="py-8 text-center text-red-700">
          Không thể tải sản phẩm. Vui lòng thử lại.
        </p>
      )}
      {status === "empty" && (
        <p className="py-8 text-center text-gray-500">
          Chưa có sản phẩm trong danh mục này.
        </p>
      )}
      {status === "ready" && (
        <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {products.map(({ _id, ...p }) => (
          <Product
            key={_id}
            id={_id}
            {...p}
            bgColor="#FAF8FF"
            textColorPriceSale="#BA1A1A"
            sold="1.2k"
          />
          ))}
        </div>
      )}
    </main>
  );
}
