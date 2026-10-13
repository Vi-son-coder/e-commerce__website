

export default function VoucherSection() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
          
          Mã giảm giá & Khuyến mãi
        </div>
        <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
          12 mã khả dụng
        </span>
      </div>

      {/* Input Voucher */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          
          <input
            type="text"
            placeholder="Nhập mã ưu đãi..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-200 transition">
          Áp dụng
        </button>
      </div>

      {/* Active Voucher Badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs px-2.5 py-1 rounded-lg font-bold">
          NOVAMART50K (-50k)
          <button className="ml-1 text-purple-400 hover:text-purple-700">×</button>
        </span>
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-lg font-bold">
           FREESHIP Extra
          <button className="ml-1 text-emerald-400 hover:text-emerald-700">×</button>
        </span>
      </div>
    </div>
  );
}