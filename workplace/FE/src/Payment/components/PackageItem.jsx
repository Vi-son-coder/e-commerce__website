import ProductCardInCart from "../../CustomComponent/ProductCardInCart/ProductCardInCart";

export default function PackageItem({
  shopName,
  items,
  shippingOptions,
  notePlaceholder,
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      {/* Shop Header */}
      <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            MALL
          </span>
          <span className="font-bold text-gray-800 text-sm">{shopName}</span>
        </div>
        <button className="text-xs text-blue-600 flex items-center gap-1 hover:underline font-medium">
          💬 Chat với người bán
        </button>
      </div>

      {/* Sản phẩm */}
      {items.map((product) => (
        <ProductCardInCart product={product} />
      ))}

      {/* Vận chuyển & Ghi chú */}
      <div className="bg-gray-50/80 rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="font-bold text-gray-700 block mb-2">
            🚚 Phương thức giao hàng
          </span>
          {shippingOptions.map((option, idx) => (
            <label
              key={idx}
              className="flex items-start gap-2 mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name={`shipping-${shopName}`}
                defaultChecked={option.checked}
                className="mt-0.5 text-blue-600"
              />
              <div className="flex-1 flex justify-between">
                <div>
                  <span className="font-semibold text-gray-800">
                    {option.title}
                  </span>
                  {option.subtext && (
                    <p className="text-gray-400 text-[11px]">
                      {option.subtext}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-600">
                    {option.price}
                  </span>
                  {option.oldPrice && (
                    <p className="text-gray-400 line-through text-[10px]">
                      {option.oldPrice}
                    </p>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>

        <div>
          <span className="font-bold text-gray-700 block mb-2">
            ✏️ Lời nhắn cho shop:
          </span>
          <textarea
            rows="2"
            placeholder={notePlaceholder}
            className="w-full border rounded-lg p-2 text-xs focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
