import { Link } from "react-router-dom";


export default function OrderSummary() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center pb-3 border-b mb-3">
        <h3 className="font-bold text-gray-800 uppercase text-xs">CHI TIẾT THANH TOÁN</h3>
        <span className="text-[11px] text-gray-400">Đã bao gồm VAT</span>
      </div>

      <div className="space-y-2 text-xs mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Tổng tiền hàng (3 món):</span>
          <span className="font-semibold text-gray-800">4.808.000đ</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Giảm giá trực tiếp shop:</span>
          <span className="font-semibold text-red-600">-651.000đ</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Phí vận chuyển thực tế:</span>
          <span className="font-semibold text-gray-800">35.000đ</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Giảm phí vận chuyển: <span className="bg-emerald-500 text-white text-[9px] font-bold px-1 rounded">FREESHIP</span></span>
          <span className="font-semibold text-emerald-600">-35.000đ</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Voucher giảm giá sàn & shop:</span>
          <span className="font-semibold text-red-600">-50.000đ</span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 mb-4">
        <div className="flex justify-between items-baseline mb-1">
          <span className="font-bold text-gray-800 text-sm">TỔNG THANH TOÁN</span>
          <span className="font-extrabold text-red-600 text-2xl">4.758.000đ</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-emerald-600 font-medium">✪ +47.580 xu NovaCoin tích lũy</span>
          <span className="text-gray-400">Tiết kiệm được 736.000đ</span>
        </div>
      </div>

      <Link to='/ConfirmPaymentPage'>
        <button className="w-full bg-blue-700 hover:bg-blue-800 !text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mb-3">
          🔒 Thanh toán ➔
        </button>
      </Link>

      <p className="text-[11px] text-gray-400 text-center mb-4">
        Bằng việc bấm Đặt hàng, bạn đồng ý với <a href="#" className="text-blue-600 underline">Điều khoản NovaMart</a> và được quyền kiểm hàng hóa khi giao nhận.
      </p>

      <div className="pt-3 border-t border-gray-100 flex justify-between text-[11px] text-gray-500">
        <span>✔ 100% Chính hãng bảo đảm</span>
        <span>🔄 Đổi trả miễn phí 30 ngày</span>
      </div>
    </div>
  );
}