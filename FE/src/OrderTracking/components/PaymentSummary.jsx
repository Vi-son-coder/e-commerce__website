
export default function PaymentSummary() {
  return (
    <div className="bg-white p-6 rounded-xl border mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-base">Thông tin thanh toán</h2>
        <span className="text-xs text-emerald-600 font-semibold border border-emerald-300 px-2 py-0.5 rounded">✓ Đã thanh toán</span>
      </div>

      <div className="space-y-1.5 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Phương thức thanh toán</span>
          <span className="font-medium text-purple-700">Ví MoMo (14:15 - 28/05)</span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính tiền hàng (2 sản phẩm)</span>
          <span>4.808.000đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển <span className="bg-blue-100 text-blue-700 text-[10px] px-1 rounded">NovaNow 2H</span></span>
          <span>25.000đ</span>
        </div>
        <div className="flex justify-between text-emerald-600">
          <span>Voucher giảm giá sàn NovaMart</span>
          <span>-75.000đ</span>
        </div>
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <div>
          <span className="font-bold text-sm text-gray-900">Tổng tiền đã thanh toán</span>
          <p className="text-[11px] text-gray-400">Đã bao gồm VAT 8%</p>
        </div>
        <span className="text-lg font-bold text-blue-600">4.758.000đ</span>
      </div>
    </div>
  );
}