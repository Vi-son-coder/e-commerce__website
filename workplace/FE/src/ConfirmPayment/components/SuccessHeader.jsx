
export default function SuccessHeader() {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 mb-6">
      {/* Icon success */}
      <div className="w-12 h-12 bg-emerald-600 text-white rounded-[50%] flex items-center justify-center mx-auto mb-3 shadow-md">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Badges */}
      <div className="flex justify-center items-center gap-2 mb-2">
        <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
          ⚡ Xác nhận tức thì
        </span>
        <span className="bg-purple-100 text-purple-700 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
          ✨ Nova AI Verified
        </span>
      </div>

      <h1 className="text-2xl font-black text-gray-900 mb-2">Đặt Hàng Thành Công!</h1>

      <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed mb-4">
        Cảm ơn quý khách <span className="font-bold text-gray-800">Nguyễn Văn An</span> đã tin chọn NovaMart. Đơn hàng đã được xác nhận, các đối tác thương hiệu đang đóng gói hỏa tốc để bàn giao đơn vị vận chuyển.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
        <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <span className="text-gray-500">Mã đơn hàng:</span>
          <span className="font-bold text-blue-700">#NM - 84920491</span>
          <button className="text-gray-400 hover:text-gray-600 font-medium">📋 Sao chép</button>
        </div>

        <div className="text-gray-500 flex items-center gap-1">
          ✉️ Đã gửi biên lai đến <span className="font-semibold text-gray-700">nguyen.an@novamart.vn</span>
        </div>
      </div>
    </div>
  );
}