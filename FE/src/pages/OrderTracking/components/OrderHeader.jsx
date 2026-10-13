
export default function OrderHeader({ orderId = 'NM-84920491' }) {
  return (
    <div className="mb-6 space-y-4">
      {/* Breadcrumb + Top Action Buttons */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 gap-2">

        <div className="flex items-center ml-auto space-x-3">
          <button className="flex items-center space-x-1 border px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-50 text-xs font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            <span>In đơn hàng</span>
          </button>
          <button className="flex items-center space-x-1 border px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-50 text-xs font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            <span>Chia sẻ lộ trình</span>
          </button>
        </div>
      </div>

      {/* Main Title & Status Badge */}
      <div className="bg-white p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-gray-900">Đơn hàng #{orderId}</h1>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-500">Đặt lúc: 14:15 - 28/05/2025</span>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            ● Đang vận chuyển
          </span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-lg flex items-center space-x-1.5">
          <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="even0dd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.57l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.57l7-10a1 1 0 011.12-.384z" clipRule="evenodd"/></svg>
          <div>
            <span className="font-bold">DỰ KIẾN NHẬN HÀNG</span>
            <p className="font-semibold text-emerald-900">Hôm nay, trước 16:30 (NovaNow 2H)</p>
          </div>
        </div>
      </div>
    </div>
  );
}