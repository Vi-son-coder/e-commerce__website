

export default function ShippingAddress() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="font-bold text-gray-800 uppercase text-sm">ĐỊA CHỈ NHẬN HÀNG</h2>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
            Đã xác thực
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-blue-600">
          <button className="hover:underline flex items-center gap-1">Thay đổi</button>
          <button className="hover:underline flex items-center gap-1">+ Thêm mới</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-gray-800">Nguyễn Văn An</span>
            <span className="text-gray-500 text-sm">· (+84) 987 654 321</span>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded font-medium">
              Mặc định / Văn phòng
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Tầng 5, Tòa nhà Bitexco, 02 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 font-medium self-start whitespace-nowrap">
          <svg className="w-3.5 h-3.5 fill-current text-emerald-600" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.57l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.57l7-10a1 1 0 011.12-.384z" />
          </svg>
          Khu vực hỗ trợ NovaNow 2H
        </div>
      </div>
    </div>
  );
}