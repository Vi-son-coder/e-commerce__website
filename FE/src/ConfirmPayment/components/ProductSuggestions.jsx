import Product from "../../ComponentTemplates/products/products";
import { mockProducts } from "../../Data/data";

export default function ProductSuggestions() {
  const products = mockProducts;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-purple-600 font-bold text-sm">
            ✨ Có Thể Bạn Cũng Thích
          </span>
        </div>
        <a
          href="#"
          className="text-xs text-blue-600 font-medium hover:underline"
        >
          Xem thêm phụ kiện &gt;
        </a>
      </div>

      <div className='flex gap-4 overflow-auto'>
        {products.map(({ id, ...p }) => (
          <Product
            id={id}
            {...p}
            textColorPriceSale="#BA1A1A"
            textColorPrice="#a4a6b3"
            bgColor="#FAF8FF"
            bgVoucherColor="#6FFBBE"
            textVoucherColor="black"
          />
        ))}
      </div>
    </div>
  );
}
