import ShippingAddress from "../components/ShippingAddress";
import PackageItem from "../components/PackageItem";
import PaymentMethods from "../components/PaymentMethods";
import OrderSummary from "../components/OrderSummary";

export default function PaymentPage({ products }) {
  const packagesData = products?.filter((p) => p.checked == true);
  return (
    <div>
      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
