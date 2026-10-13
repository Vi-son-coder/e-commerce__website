const ProductCardInCart = ({ product }) => {
  // Dữ liệu mặc định nếu không truyền props
  const defaultProduct = {
    imageUrl: "https://via.placeholder.com/80",
    title: "Áo Thun Nam Cotton Compact Siêu Mềm Mát Form R...",
    color: "Xanh Navy",
    size: "L",
    price: 259000,
    originalPrice: 399000,
  };

  const item = product || defaultProduct;

  // Định dạng tiền tệ Việt Nam (VNĐ)
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="flex p-4 items-center justify-between font-sans">
      {/* Khối bên trái: Ảnh + Thông tin sản phẩm */}
      <div className="flex items-center gap-4">
        {/* Ảnh sản phẩm */}
        <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium flex-shrink-0">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            "80 x 80"
          )}
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-gray-900 font-semibold text-base line-clamp-1">
            {item.title}
          </h3>
          <div>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md">
              Màu: {item.color} | Size: {item.size}
            </span>
          </div>
        </div>
      </div>

      {/* Khối bên phải: Giá tiền */}
      <div className="flex flex-col items-end justify-center pl-4">
        <span className="text-black font-bold text-lg leading-tight">
          {formatCurrency(item.price)}
        </span>
        {item.originalPrice && (
          <span className="text-gray-400 text-sm line-through mt-0.5">
            {formatCurrency(item.originalPrice)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardInCart;
