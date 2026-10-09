import { Link } from "react-router-dom";
export default function OrderSummary() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="font-bold text-gray-900 text-base">Tóm tắt đơn hàng</h3>

      <div className="space-y-2.5 text-sm border-b border-gray-100 pb-4">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính (2 sản phẩm):</span>
          <span className="font-bold text-gray-900">4.808.000đ</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-medium">
          <span>🎁 Giảm giá sản phẩm:</span>
          <span className="font-bold">-651.000đ</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-medium">
          <span>🎫 Voucher NovaMart:</span>
          <span className="font-bold">-50.000đ</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Phí vận chuyển:</span>
          <span className="line-through text-gray-400">35.000đ</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-medium">
          <span>Giảm phí vận chuyển:</span>
          <span className="font-bold">-35.000đ</span>
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="bg-slate-50 p-4 rounded-xl space-y-1">
        <div className="flex justify-between items-baseline">
          <span className="font-bold text-gray-900 text-sm">
            Tổng thanh toán:
          </span>
          <span className="text-2xl font-black text-red-600">4.758.000đ</span>
        </div>
        <div className="flex justify-between text-[11px] text-gray-500">
          <span>Đã gồm VAT & miễn phí ship</span>
          <span className="text-purple-600 font-bold">+47.580 NovaCoin</span>
        </div>
      </div>

      <Link to='/PaymentPage'>
        <button className="w-full bg-blue-600 !text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
          Tiến Hành Thanh Toán
        </button>
      </Link>

      <div className="flex justify-center items-center gap-6 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <span className="flex items-center gap-1">Bảo mật SSL 256-bit</span>
        <span className="flex items-center gap-1">Đổi trả 30 ngày free</span>
      </div>
    </div>
  );
}
