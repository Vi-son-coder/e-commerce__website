import { formatUsdAsVnd } from "../../../utils/currency";

export default function PackageItem({ product = null }) {
  let newPrice = (
    (product?.price * (100 - product?.discountPercentage)) /
    100
  );
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between text-sm font-semibold border border-gray-100">
      {/* Khối bên trái: Ảnh + Thông tin sản phẩm */}
      <div className="flex items-center gap-4">
        {/* Ảnh sản phẩm */}
        <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium flex-shrink-0">
          <img src={product?.images[0]} alt="ảnh sản phẩm" />
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-gray-900 font-semibold text-base line-clamp-1">
            {product?.title}
          </h3>
          <div>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md">
              Màu: | Size:
            </span>
          </div>
        </div>
      </div>
      {/* Số lượng sản phẩm */}
      <span className="font-semibold">Số lượng: {product.quantity}</span>
      {/* Khối bên phải: Giá tiền */}
      <div className="flex flex-col items-end justify-center pl-4">
        <span className="text-black font-bold text-lg leading-tight">
          {formatUsdAsVnd(newPrice)}
        </span>
        {product?.price && (
          <span className="text-gray-400 text-sm line-through mt-0.5">
            {formatUsdAsVnd(product?.price)}
          </span>
        )}
      </div>
    </div>
  );
}
