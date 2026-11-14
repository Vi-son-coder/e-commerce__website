import ShippingAddress from "../components/ShippingAddress";
import PackageItem from "../components/PackageItem";
import PaymentMethods from "../components/PaymentMethods";
import OrderSummary from "../components/OrderSummary";

export default function PaymentPage({ products }) {
  const packagesData = products?.filter((p) => p.checked == true);
  return (
    <div className="checkout-page">
      <div className="checkout-heading">
        <p className="checkout-eyebrow">Bước 2 · Hoàn tất đơn hàng</p>
        <h1>Giao hàng & thanh toán</h1>
        <p>
          Kiểm tra địa chỉ nhận hàng, sản phẩm và chọn cách thanh toán phù hợp.
        </p>
      </div>
      <ol className="checkout-steps" aria-label="Tiến trình đặt hàng">
        <li className="is-complete">
          <span>✓</span>
          <strong>Giỏ hàng</strong>
        </li>
        <li className="is-current">
          <span>2</span>
          <strong>Giao hàng & thanh toán</strong>
        </li>
        <li>
          <span>3</span>
          <strong>Hoàn tất</strong>
        </li>
      </ol>
      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-3">
        {/* Main Left Content */}
        <div className="lg:col-span-2">
          <ShippingAddress />

          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800 text-sm uppercase flex items-center gap-2">
              📦 DANH SÁCH KIỆN HÀNG ({packagesData.length} Sản phẩm)
            </h3>
            <span className="text-xs text-gray-500">
              Tổng 3 sản phẩm sẵn sàng giao
            </span>
          </div>

          {packagesData.map((pkg) => (
            <PackageItem key={pkg.id} product={pkg} />
          ))}

          <PaymentMethods />
        </div>

        {/* Sidebar Right */}
        <div className="lg:col-span-1">
          <OrderSummary products={packagesData} />
        </div>
      </div>
    </div>
  );
}
