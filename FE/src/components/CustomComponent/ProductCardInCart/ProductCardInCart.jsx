import { useState } from "react";
import { addToCart, removeFromCart } from "../../../services/cart.service";
import { formatUsdAsVnd } from "../../../utils/currency";

const ProductInCart = ({
  product = {},
  onRemove,
  setSelectOne,
  getQuantity,
}) => {
  const [quantity, setQuantity] = useState(product?.quantity);
  const [quantityError, setQuantityError] = useState("");

  async function quantityChange(number) {
    const newQuantity = quantity + number;
    setQuantityError("");
    try {
      if (newQuantity <= 0) {
        await handleRemove();
        return;
      }

      const result = await addToCart(product?._id, number);
      if (!result.ok) {
        throw new Error(result.data?.message || "Không thể cập nhật số lượng");
      }
      setQuantity(newQuantity);
      getQuantity(product?._id, newQuantity);
    } catch (error) {
      console.error("Lỗi cập nhật giỏ hàng:", error);
      setQuantityError(error.message || "Không thể cập nhật giỏ hàng");
    }
  }

  async function handleRemove() {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa "${product?.title || "sản phẩm"}" khỏi giỏ hàng?`,
    );
    if (!confirmed) return;

    setQuantityError("");
    try {
      await removeFromCart(product?._id);
      onRemove(product?._id);
    } catch (error) {
      console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
      setQuantityError(error.message || "Không thể xóa sản phẩm");
    }
  }

  const newPrice = (product?.price * (100 - product?.discountPercentage)) / 100;
  const totalPrice = newPrice * quantity;
  return (
    <tr className="market-cart-item">
      <td>
        <input
          aria-label={`Chọn ${product?.title || "sản phẩm"}`}
          type="checkbox"
          className="cart-product-select"
          checked={Boolean(product?.checked)}
          onChange={() => setSelectOne(product?._id)}
        />
      </td>
      <td>
        <div className="cart-product-cell">
          <img
            alt=""
            className="cart-product-thumb"
            src={product?.images?.[0] || ""}
          />
          <div className="cart-product-details">
            <strong>{product?.title || "Sản phẩm"}</strong>
            <span>{product?.brand || "Chưa có thương hiệu"}</span>
            {quantityError && (
              <span className="cart-product-error" role="alert">
                {quantityError}
              </span>
            )}
          </div>
        </div>
      </td>
      <td>
        <div className="cart-product-price">
          <strong>{formatUsdAsVnd(newPrice)}</strong>
          {product?.discountPercentage > 0 && (
            <span className="line-through">{formatUsdAsVnd(product?.price)}</span>
          )}
        </div>
      </td>
      <td>
        <div className="cart-product-quantity">
          <button
            aria-label={`Giảm số lượng ${product?.title || "sản phẩm"}`}
            onClick={() => quantityChange(-1)}
            type="button"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            aria-label={`Tăng số lượng ${product?.title || "sản phẩm"}`}
            onClick={() => quantityChange(1)}
            type="button"
          >
            +
          </button>
        </div>
      </td>
      <td>
        <strong className="cart-product-total">
          {formatUsdAsVnd(totalPrice)}
        </strong>
      </td>
      <td className="cart-product-actions">
        <button
          aria-label={`Xóa ${product?.title || "sản phẩm"} khỏi giỏ hàng`}
          className="cart-product-remove"
          onClick={handleRemove}
          type="button"
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ProductInCart;
