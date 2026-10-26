import Product from "../../../components/ComponentTemplates/products/products";
import { useState, useEffect } from "react";

// 2. Component chính hiển thị Danh sách gợi ý
export default function RelatedProductsList({ productId }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!productId) return;

    // Chỉnh lại URL có thêm đoạn "bought-together" cho khớp với Router của BE
    fetch(
      `http://localhost:3000/products/recommendations/bought-together/${productId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Danh sách sản phẩm lấy ra:", data.recommendations);
          // Sửa lại thành data.recommendations để lấy đúng cái mảng sản phẩm
          setRecommendations(data.recommendations);
        }
      })
      .catch((err) => console.error("Lỗi lấy sản phẩm:", err));
  }, [productId]);

  return (
    <section className="bg-white rounded-2xl p-5 shadow-sm mt-4">
      {/* Tiêu đề mục */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-gray-900 text-base">
          Gợi Ý Thông Minh Từ AI: Thường Mua Cùng & Tương Tự
        </h3>
        <span className="bg-purple-100 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
          AI MATCHED
        </span>
      </div>

      {/* Lưới sản phẩm */}
      <div className="flex gap-4 overflow-auto ">
        {recommendations &&
          recommendations.map(({ _id, ...p }) => (
            <Product
              key={_id}
              id={_id}
              {...p}
              bgColor="#FAF8FF"
              textColorPriceSale="#BA1A1A"
              sold="1,2k"
            />
          ))}
      </div>
    </section>
  );
}
