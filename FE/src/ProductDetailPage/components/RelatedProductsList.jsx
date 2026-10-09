import Product from "../../ComponentTemplates/products/products";
import { mockProducts } from "../../Data/data";

const RECOMMENDED_PRODUCTS = mockProducts;

// 2. Component chính hiển thị Danh sách gợi ý
export default function RelatedProductsList() {
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {RECOMMENDED_PRODUCTS.map((product) => (
          /* Dùng Destructuring + Spread props gọn gàng */
          <Product
            key={product.id}
            {...product}
            id={product.id}
            bgColor="#F2F3FF"
            textColorPriceSale="#BA1A1A"
            textColorPrice="#a4a6b3"
            textVoucherColor="black"
            bgVoucherColor='#6FFBBE'
          />
        ))}
      </div>
    </section>
  );
}
