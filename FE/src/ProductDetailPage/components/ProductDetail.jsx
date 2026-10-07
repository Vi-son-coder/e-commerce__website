export default function ProductDetail({product}){
    return(
        <div className="bg-white rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cột trái: Gallery Ảnh */}
          <div className="md:col-span-5">
            <div className="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden border-[#e5e5e518] border-1">
              <img
                src={product.pic}
                alt="Keychron Q1 Pro"
                className="w-full h-full object-cover "
              />
            </div>
            {/* List ảnh nhỏ */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 bg-gray-100 rounded-lg border hover:border-blue-500 cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Cột phải: Thông tin sản phẩm & Chọn option */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="flex-1 flex flex-col">
              <p className="text-[13px] font-semibold bg-violet-200 w-fit px-3 rounded-[5px]">
                {product.brand}
              </p>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <span className=" font-bold flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-amber-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  {product.avergeRating}
                </span>
                <span>(640 đánh giá)</span>
                <span>Đã bán {product.sold}</span>
              </div>

              {/* Giá */}
              <div className="bg-red-50 p-4 rounded-xl mb-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-red-600">
                  {product.priceSale}đ
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.price}đ
                </span>
                <span className="bg-red-700 text-white text-xs px-2 py-0.5 rounded font-bold">
                  -{product.percen}%
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-medium text-gray-600 flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4 text-blue-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6Z"
                    />
                  </svg>
                  Voucher sàn & Gian hàng
                </span>
                <span className="bg-green-300 w-fit px-4 rounded-[5px] text-green-900 font-medium py-1 text-[12px]">
                  {product.voucher}{" "}
                  <button className=" !text-black ml-3 underline">Lưu</button>
                </span>
              </div>
              <div className="flex gap-5 mt-auto items-center mb-5">
                <span className="text-gray-800 font-semibold text-[13px]">Số lượng:</span>
                <div className="flex items-center gap-5 p-1 bg-[#F2F3FF] rounded-[7px]">
                  <button className="bg-white w-8 h-8 rounded-[7px] font-black">-</button>
                  <span className="font-semibold">1</span>
                  <button className="bg-white w-8 h-8 rounded-[7px] font-black">+</button>
                </div>
                <span className="text-gray-800 font-semibold text-[13px]">Còn 38 sản phẩm trong kho</span>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-3 pt-4 border-t">
              <button className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50">
                Thêm Vào Giỏ Hàng
              </button>
              <button className="flex-1 py-3 bg-blue-600 !text-white font-medium rounded-xl hover:bg-blue-700">
                Mua Ngay
              </button>
            </div>
          </div>
        </div>
    )
}