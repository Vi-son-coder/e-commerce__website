import RelatedProductsList from "../components/RelatedProductsList";

import { useSearchParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { useProducts } from "../../../hooks/useProducts";

export default function ProductDetailPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("productId");
  const { products } = useProducts();

  const product = products?.find((p) => String(p._id) == String(id));

  return (
    <div className="product-detail-page w-full flex flex-col gap-4 mt-7">
      {/* Khối 1: Chi tiết sản phẩm chính (Ảnh, Tên, Giá, Mua hàng) */}
      <ProductDetail product={product} />

      {/* Khối 2: Tabs mô tả chi tiết */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex border-b gap-6 pb-3 font-medium text-sm text-gray-600">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-3 font-bold">
            Mô Tả Chi Tiết
          </button>
        </div>
        <div
          className="py-4 text-sm text-gray-700 leading-relaxed"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {product?.description || "Sản phẩm chưa có mô tả chi tiết."}
        </div>
      </div>

      {/* Khối 3: Danh sách Sản phẩm gợi ý (Gọi Component ở trên) */}
      <RelatedProductsList productId={id} />
    </div>
  );
}
