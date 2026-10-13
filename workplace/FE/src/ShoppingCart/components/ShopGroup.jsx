

import ProductCardInCart from "../../CustomComponent/ProductCardInCart/ProductCardInCart";


export default function ShopGroup({ shop }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Shop Header */}
      <div className="p-4 bg-slate-50/50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            defaultChecked={shop.checked}
            className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
          />
          {shop.isMall && (
            <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
              MALL
            </span>
          )}
          <span className="font-bold text-sm text-gray-900">{shop.name}</span>
          
          
          {shop.expressBadge && (
            <span className="flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
              {shop.expressBadge}
            </span>
          )}
        </div>

        {shop.voucherText && (
          <div className="flex items-center gap-1 text-xs text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md font-medium border border-purple-100">
            {shop.voucherText}
          </div>
        )}
      </div>

      {/* Product List */}
      <div>
        {shop.items.map((item) => (
          <ProductCardInCart product={item}/>
        ))}
      </div>
    </div>
  );
}