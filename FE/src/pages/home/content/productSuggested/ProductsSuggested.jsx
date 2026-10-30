import Product from "../../../../components/ComponentTemplates/products/products";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../../../api/request.api";
import { convertUsdToVnd } from "../../../../utils/currency";

export default function ProductsSuggested() {
  const {
    selectedSuggestedCategory,
    recommendationRefresh,
    showAllSuggested,
  } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isActive = true;

    async function loadRecommendations() {
      setStatus("loading");
      try {
        const response = await request({
          reqPATH: "/products/recommendations/home?limit=20",
        });
        if (!response.ok) {
          throw new Error(`Không thể tải gợi ý riêng (${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data.recommendations)) {
          throw new Error("Dữ liệu gợi ý riêng không hợp lệ");
        }

        if (isActive) {
          setProducts(data.recommendations);
          setStatus(data.recommendations.length ? "ready" : "empty");
        }
      } catch (error) {
        if (!isActive) return;
        console.error("Lỗi tải gợi ý riêng:", error);
        setStatus("error");
      }
    }

    loadRecommendations();
    return () => {
      isActive = false;
    };
  }, [recommendationRefresh]);

  const categoryMatches = {
    "Điện tử": [
      "điện tử",
      "điện thoại",
      "laptop",
      "tai nghe",
      "máy ảnh",
      "đồng hồ",
      "điện gia dụng",
    ],
    "Thời trang": ["thời trang"],
    "Làm đẹp": ["sắc đẹp", "làm đẹp"],
    "Nhà cửa & Đời sống": ["gia dụng", "nhà cửa", "đời sống"],
    "Thể thao": ["thể thao"],
  };

  const filteredProducts = products.filter((product) => {
    if (selectedSuggestedCategory === "Dưới 500k") {
      return convertUsdToVnd(product.price) < 500_000;
    }
    if (selectedSuggestedCategory === "Tất cả") return true;

    const category = String(product.category || "").toLocaleLowerCase("vi");
    return (categoryMatches[selectedSuggestedCategory] || []).some((match) =>
      category.includes(match),
    );
  });
  const visibleProducts = showAllSuggested
    ? filteredProducts
    : filteredProducts.slice(0, 18);

  return (
    <>
      {status === "loading" && (
        <p className="py-8 text-center text-sm text-gray-500">
          AI đang phân tích sản phẩm phù hợp...
        </p>
      )}
      {status === "error" && (
        <p className="py-8 text-center text-sm text-red-700">
          Không tải được gợi ý riêng. Vui lòng thử làm mới trang.
        </p>
      )}
      {status === "empty" && (
        <p className="py-8 text-center text-sm text-gray-500">
          Chưa có sản phẩm phù hợp để gợi ý.
        </p>
      )}
      {status === "ready" && filteredProducts.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          Chưa có sản phẩm trong danh mục này.
        </p>
      )}
      {status === "ready" && filteredProducts.length > 0 && (
        <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {visibleProducts.map(({ _id, ...product }) => (
            <Product
              key={_id}
              id={_id}
              {...product}
              bgColor="#FAF8FF"
              textColorPriceSale="#BA1A1A"
              sold="1.2k"
            />
          ))}
        </div>
      )}
    </>
  );
}
