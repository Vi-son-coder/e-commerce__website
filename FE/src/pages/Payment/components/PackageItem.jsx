import { formatUsdAsVnd } from "../../../utils/currency";

export default function PackageItem({ product = null }) {
  const newPrice =
    (product?.price * (100 - product?.discountPercentage)) / 100;

  return (
    <article className="checkout-package-item">
      <div className="checkout-package-product">
        <img
          alt=""
          className="checkout-package-thumb"
          src={product?.images?.[0] || ""}
        />
        <div className="checkout-package-details">
          <h3>{product?.title || "Sản phẩm"}</h3>
          <span>{product?.brand || "Sản phẩm chính hãng"}</span>
        </div>
      </div>
      <span className="checkout-package-quantity">
        Số lượng: <strong>{product?.quantity || 0}</strong>
      </span>
      <div className="checkout-package-price">
        <strong>{formatUsdAsVnd(newPrice)}</strong>
        {product?.discountPercentage > 0 && (
          <span>{formatUsdAsVnd(product?.price)}</span>
        )}
      </div>
    </article>
  );
}
