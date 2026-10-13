

export default function PaymentInfoCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-3">
        <h3 className="font-bold text-gray-800 text-xs uppercase flex items-center gap-1.5">
          💳 Phương Thức Thanh Toán
        </h3>
        <span className="bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          ✓ Đã Hoàn Tất
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-[10px]">
            MoMo
          </div>
          <div>
            <p className="font-bold text-gray-800 text-xs">Ví điện tử MoMo</p>
            <p className="text-[10px] text-gray-400">Liên kết thông minh SmartPay</p>
          </div>
        </div>
        <span className="font-mono text-xs text-gray-600">9821****32</span>
      </div>

      <div className="space-y-1 text-[11px] text-gray-500 mb-3">
        <div className="flex justify-between">
          <span>Mã giao dịch MoMo:</span>
          <span className="font-mono font-semibold text-gray-700">MOMO-98214432</span>
        </div>
        <div className="flex justify-between">
          <span>Thời gian giao dịch:</span>
          <span className="text-gray-700">14:15 - 28/05/2025</span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[11px]">
        <span className="text-emerald-600 font-medium flex items-center gap-1">
          🛡️ Bảo mật giao dịch NovaSafe 100%
        </span>
        <span className="text-gray-400">Hợp lệ</span>
      </div>
    </div>
  );
}