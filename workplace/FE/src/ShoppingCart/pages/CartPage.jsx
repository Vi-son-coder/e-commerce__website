
import BreadcrumbAndStepper from "../components/BreadcrumbAndStepper";
import ShopGroup from "../components/ShopGroup";
import VoucherSection from "../components/VoucherSection";
import OrderSummary from "../components/OrderSummary";

// Mẫu dữ liệu Mock Data
const CART_DATA = [
  {
    id: "shop-1",
    name: "Keychron Vietnam Official Mall",
    isMall: true,
    checked: true,
    voucherText: "Voucher giảm 50k",
    items: [
      {
        id: "item-1",
        checked: true,
        tag: "NovaMall",
        title: "Bàn Phím Cơ Không Dây Keychron Q1 Pro...",
        variant: "Phân loại: Đen Carbon / K Pro Red",
        price: "4.290.000đ",
        originalPrice: "5.100.000đ",
        quantity: 1,
        stockText: "Còn 38 sp",
        totalPrice: "4.290.000đ",
        image: "https://via.placeholder.com/80",
      },
    ],
  },
  {
    id: "shop-2",
    name: "Coolmate Official Store",
    isMall: true,
    checked: true,
    expressBadge: "Giao hỏa tốc 2H",
    voucherText: "Mã giảm 20k",
    items: [
      {
        id: "item-2",
        checked: true,
        title: "Áo Thun Nam Cotton Compact Siêu Mềm Mát Form R...",
        variant: "Màu: Xanh Navy | Size: L",
        price: "259.000đ",
        originalPrice: "399.000đ",
        quantity: 2,
        stockText: "Sẵn hàng",
        totalPrice: "518.000đ",
        image: "https://via.placeholder.com/80",
      },
      {
        id: "item-3",
        checked: false,
        title: "Quần Kaki Nam Dáng Slimfit Co Giãn 4 Chiều Thoáng...",
        variant: "Màu: Be Sand | Size: 32",
        price: "389.000đ",
        originalPrice: "499.000đ",
        quantity: 1,
        stockText: "Sẵn hàng",
        totalPrice: "389.000đ",
        image: "https://via.placeholder.com/80",
      },
    ],
  },
];

export default function CartPage() {
  return (
    
      <div className=" mt-13">
        {/* Breadcrumb & Stepper Component */}
        <BreadcrumbAndStepper itemCount={3} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CỘT TRÁI */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header Chọn Tất Cả */}
            <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between text-sm font-semibold border border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <span>Chọn tất cả (3 sản phẩm)</span>
                <button className="text-red-500 hover:underline text-xs ml-2 font-medium">
                  Xóa đã chọn
                </button>
              </div>

              <div className="hidden md:flex items-center gap-16 text-gray-400 font-medium text-xs">
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Số tiền</span>
                <button className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs hover:bg-purple-100 transition">
                    Xem mẫu giỏ trống
                </button>
              </div>
            </div>

            {/* Danh sách các Shop */}
            {CART_DATA.map((shop) => (
              <ShopGroup key={shop.id} shop={shop} />
            ))}

            {/* Bottom Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  Chọn tất cả
                </label>
                <button className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                  Tiếp tục mua sắm 
                </button>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl flex items-center gap-3 w-full md:w-auto">
                <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                  🚚 Mua thêm <strong className="underline">192.000đ</strong> để nhận Freeship 100%
                </span>
                <div className="w-20 bg-emerald-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[80%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-4 space-y-4">
            <VoucherSection />
            <OrderSummary />
          </div>
        </div>
      </div>
   
  );
}