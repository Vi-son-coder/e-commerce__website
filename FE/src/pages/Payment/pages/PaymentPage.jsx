
import ShippingAddress from '../components/ShippingAddress';
import PackageItem from '../components/PackageItem';
import PaymentMethods from '../components/PaymentMethods';
import OrderSummary from '../components/OrderSummary';

export default function PaymentPage() {
  const packagesData = [
    {
      id: 1,
      shopName: 'Keychron Vietnam Official Mall',
      items: [
        {
          id: 'p1',
          title: 'Bàn Phím Cơ Không Dây Cao Cấp Keychron Q1 Pro QMK/VIA',
          variant: 'Đen Carbon / K Pro Red Switch',
          price: 4290000,
          oldPrice: 4890000,
          quantity: 1,
          isOfficial: true,
          image: 'https://via.placeholder.com/100'
        }
      ],
      shippingOptions: [
        { title: 'Hóa Tốc NovaNow 2H (Nhận chiều nay)', price: '25.000đ', checked: true },
        { title: 'Tiêu chuẩn (1-2 ngày)', price: '15.000đ (0đ)', oldPrice: '15.000đ' }
      ],
      notePlaceholder: 'Lưu ý đóng gói kỹ, giao trong giờ hành chính...'
    },
    {
      id: 2,
      shopName: 'Coolmate Official Store',
      items: [
        {
          id: 'p2',
          title: 'Áo Thun Nam Cotton Compact Siêu Mềm Thoáng Khí',
          variant: 'Xanh Navy · Size L (SL: 2 cái)',
          price: 518000,
          oldPrice: 569000,
          quantity: 2,
          badge: 'Tài trợ Freeship',
          image: 'https://via.placeholder.com/100'
        }
      ],
      shippingOptions: [
        { title: 'Tiêu chuẩn Nhanh (1-2 ngày)', subtext: 'Dự kiến giao ngày mai', price: '0đ', oldPrice: '20.000đ', checked: true }
      ],
      notePlaceholder: 'Ghi chú thêm cho shop...'
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-6 font-sans">
      <div className="max-w-6xl mx-auto px-4">

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left Content */}
          <div className="lg:col-span-2">
            <ShippingAddress />

            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800 text-sm uppercase flex items-center gap-2">
                📦 DANH SÁCH KIỆN HÀNG (2 Nhà bán)
              </h3>
              <span className="text-xs text-gray-500">Tổng 3 sản phẩm sẵn sàng giao</span>
            </div>

            {packagesData.map((pkg) => (
              <PackageItem
                key={pkg.id}
                shopName={pkg.shopName}
                items={pkg.items}
                shippingOptions={pkg.shippingOptions}
                notePlaceholder={pkg.notePlaceholder}
              />
            ))}

            <PaymentMethods />
          </div>

          {/* Sidebar Right */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}