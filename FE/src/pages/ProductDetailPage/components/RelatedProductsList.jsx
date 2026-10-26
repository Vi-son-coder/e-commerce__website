import Product from "../../../components/ComponentTemplates/products/products";
import { useProducts } from "../../../hooks/useProducts";


// 2. Component chính hiển thị Danh sách gợi ý
export default function RelatedProductsList() {
  const {products} = useProducts({limit:7});

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

      {/* Lưới sản phẩm (Grid 6 cột) */}
      <div className="flex gap-4 overflow-auto ">
        {products?.map(({ _id, ...p }) => (
          /* Dùng Destructuring + Spread props gọn gàng */
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
