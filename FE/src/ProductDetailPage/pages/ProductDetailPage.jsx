import RelatedProductsList from "../components/RelatedProductsList";
import { mockProducts } from "../../Data/data";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailPage() {
  const {id} = useParams();
  const product = mockProducts.find((p) => String(p.id) == String(id));
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Khối 1: Chi tiết sản phẩm chính (Ảnh, Tên, Giá, Mua hàng) */}
        <ProductDetail product={product}/>

        {/* Khối 2: Thông tin gian hàng */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div>
              <h3 className="font-bold text-gray-900">
                Keychron Vietnam Official Mall
              </h3>
              <p className="text-xs text-gray-500">Online 5 phút trước</p>
            </div>
          </div>
          <button className="px-4 py-2 border text-sm font-medium rounded-lg hover:bg-gray-50">
            Xem Shop
          </button>
        </div>

        {/* Khối 3: Tabs mô tả chi tiết */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex border-b gap-6 pb-3 font-medium text-sm text-gray-600">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-3 font-bold">
              Mô Tả Chi Tiết
            </button>
            <button>Bảng Thông Số Kỹ Thuật</button>
            <button>Chính Sách Đổi Trả</button>
          </div>
          <div className="py-4 text-sm text-gray-700 leading-relaxed">
            Trải nghiệm gõ hoàn hảo với thiết kế Double-Gasket Mount đẳng cấp...
          </div>
        </div>

        {/* Khối 4: Danh sách Sản phẩm gợi ý (Gọi Component ở trên) */}
        <RelatedProductsList />
      </div>
    </div>
  );
}
