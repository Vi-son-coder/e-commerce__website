import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../../../services/cart.service";

const ProductInCart = ({
  product = [],
  onRemove = [],
  setSelectOne = [],
  getQuantity = []
}) => {
  const [quantity, setQuantity] = useState(product?.quantity);
  // Định dạng tiền tệ Việt Nam (VNĐ)
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState(false);

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };
  async function quantityChange(number) {
    const newQuantity = quantity + number;
    console.log(newQuantity);
    if (newQuantity <= 0) {
      await removeFromCart(product?._id);
      onRemove(product?._id);
    } else {
      setStep(number);
      setQuantity(newQuantity);
      getQuantity(product?._id,newQuantity);
    }
  }

  useEffect(() => {
    async function checked() {
      await setChecked(product.checked);
    }
    checked();
  }, [product]);

  useEffect(() => {
    addToCart(product?._id, step);
  }, [quantity]);

  let newPrice = (
    (product?.price * (100 - product?.discountPercentage)) /
    100
  ).toFixed(0);
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between text-sm font-semibold border border-gray-100">
      {/* Khối bên trái: Ảnh + Thông tin sản phẩm */}
      <div className="flex items-center gap-4">
        {/* checkbox */}
        <input
          type="checkbox"
          className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
          checked={checked}
          onClick={() => setSelectOne(product?._id)}
        />
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
      <div className="flex items-center gap-5 p-1 bg-[#F2F3FF] rounded-[7px]">
        <button
          onClick={() => quantityChange(-1)}
          className="bg-white w-8 h-8 rounded-[7px] font-black active:bg-[#d4d4d4d2]"
        >
          -
        </button>
        <span className="font-semibold">{quantity}</span>
        <button
          onClick={() => quantityChange(1)}
          className="bg-white w-8 h-8 rounded-[7px] font-black "
        >
          +
        </button>
      </div>

      {/* Khối bên phải: Giá tiền */}
      <div className="flex flex-col items-end justify-center pl-4">
        <span className="text-black font-bold text-lg leading-tight">
          {formatCurrency(newPrice)}
        </span>
        {product?.price && (
          <span className="text-gray-400 text-sm line-through mt-0.5">
            {formatCurrency(product?.price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductInCart;
