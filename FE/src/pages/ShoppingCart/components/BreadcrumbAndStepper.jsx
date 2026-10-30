import { Link } from "react-router-dom";

export default function BreadcrumbAndStepper({ itemCount }) {
  return (
    <div className="cart-heading">
      <div className="cart-breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <strong>Giỏ hàng</strong>
      </div>
      <div className="cart-title-row">
        <div>
          <h1>Giỏ hàng</h1>
          <p>
            {itemCount} sản phẩm đang chờ bạn. Kiểm tra lựa chọn trước khi thanh
            toán.
          </p>
        </div>
        <span className="cart-count">
          {itemCount} món
        </span>
      </div>
      <ol className="checkout-steps" aria-label="Tiến trình đặt hàng">
        <li className="is-current">
          <span>1</span>
          <strong>Giỏ hàng</strong>
        </li>
        <li>
          <span>2</span>
          <strong>Giao hàng & thanh toán</strong>
        </li>
        <li>
          <span>3</span>
          <strong>Hoàn tất</strong>
        </li>
      </ol>
    </div>
  );
}
