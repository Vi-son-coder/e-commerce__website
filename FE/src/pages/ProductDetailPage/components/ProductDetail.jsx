import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../../../services/cart.service";
import NotificationAddToCart from "./NotificationAddToCart";
import { trackAction } from "../../../services/tracking.service";
import { formatUsdAsVnd } from "../../../utils/currency";
import { getCurrentUser } from "../../../services/auth.storage";

export default function ProductDetail({ product }) {
  const images = Array.isArray(product?.images)
    ? product.images.filter(Boolean)
    : [];
  const [selectedImage, setSelectedImage] = useState({
    productId: product?._id,
    index: 0,
  });
  const selectedImageIndex =
    selectedImage.productId === product?._id ? selectedImage.index : 0;
  const newPrice = (
    (product?.price * (100 - product?.discountPercentage)) /
    100
  );

  const [quantityClick, setQuantityClick] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    status: false,
  });
  let timeoutRef = useRef(null);

  async function handleAddToCartAlert(productId, quantity) {
    if (!getCurrentUser()) {
      const redirect = encodeURIComponent(`${location.pathname}${location.search}`);
      navigate(`/login?redirect=${redirect}`);
      return;
    }

    try {
      const res = await addToCart(productId, quantity);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setNotification({
        show: true,
        message: res.ok ? "Đã thêm vào giỏ hàng" : res.data.message || "Thêm vào giỏ hàng thất bại",
        status: res.ok,
      });
    } catch (error) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setNotification({
        show: true,
        message: error.message || "Không thể thêm vào giỏ hàng",
        status: false,
      });
    } finally {
      timeoutRef.current = setTimeout(() => {
        setNotification({ show: false, message: "" });
      }, 2500);
    }
  }
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Cột trái: Gallery Ảnh */}
      <div className="md:col-span-5">
        <div className="relative aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden border-[#e5e5e518] border-1">
          {images[selectedImageIndex] && (
            <img
              src={images[selectedImageIndex]}
              alt={product?.title || "Ảnh sản phẩm"}
              className="w-full h-full object-cover"
            />
          )}
          {images.length > 1 && (
            <>
              <button
                aria-label="Xem ảnh trước"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xl shadow hover:bg-white"
                onClick={() => {
                  const index =
                    (selectedImageIndex - 1 + images.length) % images.length;
                  setSelectedImage({ productId: product?._id, index });
                }}
                type="button"
              >
                ‹
              </button>
              <button
                aria-label="Xem ảnh tiếp theo"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xl shadow hover:bg-white"
                onClick={() => {
                  const index = (selectedImageIndex + 1) % images.length;
                  setSelectedImage({ productId: product?._id, index });
                }}
                type="button"
              >
                ›
              </button>
            </>
          )}
        </div>
        {/* List ảnh nhỏ */}
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              aria-label={`Xem ảnh ${index + 1} của ${product?.title || "sản phẩm"}`}
              aria-pressed={selectedImageIndex === index}
              className={`w-14 h-14 overflow-hidden rounded-lg border ${
                selectedImageIndex === index
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-blue-500"
              }`}
              key={`${image}-${index}`}
              onClick={() =>
                setSelectedImage({ productId: product?._id, index })
              }
              type="button"
            >
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Cột phải: Thông tin sản phẩm & Chọn option */}
      <div className="md:col-span-7 flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          <p className="text-[13px] font-semibold bg-violet-200 w-fit px-3 rounded-[5px]"></p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {product?.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className=" font-bold flex items-center gap-1">
              <svg
                className="w-4 h-4 text-amber-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {product?.rating}
            </span>
            <span>(640 đánh giá)</span>
            <span>Đã bán</span>
          </div>

          {/* Giá */}
          <div className="bg-red-50 p-4 rounded-xl mb-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-red-600">
              {formatUsdAsVnd(newPrice)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {formatUsdAsVnd(product?.price)}
            </span>
            <span className="bg-red-700 text-white text-xs px-2 py-0.5 rounded font-bold">
              -{product?.discountPercentage}%
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
            {product?.voucher && (
              <span className="bg-green-300 w-fit px-4 rounded-[5px] text-green-900 font-medium py-1 text-[12px]">
                {product.voucher} {}
                <button className=" !text-black ml-3 underline">Lưu</button>
              </span>
            )}
          </div>
          <div className="flex gap-5 mt-auto items-center mb-5">
            <span className="text-gray-800 font-semibold text-[13px]">
              Số lượng:
            </span>
            <div className="flex items-center gap-5 p-1 bg-[#F2F3FF] rounded-[7px]">
              <button
                onClick={() =>
                  quantityClick == 0
                    ? quantityClick
                    : setQuantityClick(quantityClick - 1)
                }
                className="bg-white active:bg-[#d4d4d4d2] w-8 h-8 rounded-[7px] font-black"
              >
                -
              </button>
              <span className="font-semibold">{quantityClick}</span>
              <button
                onClick={() => setQuantityClick(quantityClick + 1)}
                className="bg-white active:bg-[#d4d4d4d2] w-8 h-8 rounded-[7px] font-black"
              >
                +
              </button>
            </div>
            <span className="text-gray-800 font-semibold text-[13px]">
              Còn 38 sản phẩm trong kho
            </span>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={() => {
              handleAddToCartAlert(product?._id, quantityClick);
              trackAction("ADD_TO_CART", product?._id);
            }}
            className="flex-1 py-3 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50"
          >
            Thêm Vào Giỏ Hàng
          </button>
          <button className="flex-1 py-3 bg-blue-600 !text-white font-medium rounded-xl hover:bg-blue-700">
            Mua Ngay
          </button>
        </div>
      </div>
      {notification.show && (
        <NotificationAddToCart
          message={notification.message}
          status={notification.status}
        />
      )}
    </div>
  );
}
