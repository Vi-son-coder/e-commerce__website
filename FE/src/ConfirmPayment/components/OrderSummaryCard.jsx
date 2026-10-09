

export default function OrderSummaryCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-3">
        <h3 className="font-bold text-gray-800 text-xs uppercase flex items-center gap-1.5">
          📊 Tổng Giá Trị Đơn
        </h3>
        <span className="text-xs text-gray-400">3 Sản phẩm</span>
      </div>

      <div className="space-y-1.5 text-xs text-gray-600 mb-3">
        <div className="flex justify-between">
          <span>Tổng tiền hàng (gốc):</span>
          <span className="line-through text-gray-400">5.280.000đ</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-medium">
          <span>🏷️ Giảm giá sàn & Khuyến mãi:</span>
          <span>-522.000đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển hỏa tốc:</span>
          <span className="text-emerald-600 font-semibold">Miễn phí (Voucher FreeShip)</span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 mb-3">
        <div className="flex justify-between items-baseline">
          <span className="font-bold text-gray-800 text-xs">Tổng thanh toán:</span>
          <span className="text-xl font-black text-blue-700">4.758.000đ</span>
        </div>
        <p className="text-[10px] text-gray-400 text-right">(Đã bao gồm thuế GTGT 8%)</p>
      </div>

      <div className="bg-purple-50 rounded-lg p-2 flex justify-between items-center text-[11px] text-purple-700 font-medium">
        <span>🪙 Tích lũy NovaCoin:</span>
        <span className="font-bold">+47.580 xu</span>
      </div>
    </div>
  );
}