

export default function ShippingInfoCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-3">
        <h3 className="font-bold text-gray-800 text-xs uppercase flex items-center gap-1.5">
          🎧 Thông Tin Giao Hàng
        </h3>
        <span className="bg-blue-50 text-blue-600 text-[11px] font-semibold px-2 py-0.5 rounded">
          2 Kiện Hàng
        </span>
      </div>

      <div className="text-xs text-gray-600 space-y-1.5 mb-4">
        <p className="font-bold text-gray-800">
          👤 Nguyễn Văn An <span className="font-normal text-gray-500">· (+84) 987 654 321</span>
        </p>
        <p className="text-gray-500 leading-snug">
          📍 Tầng 5, Tòa nhà Bitexco, 02 Hải Triều, P. Bến Nghé, Quận 1, TP. HCM
        </p>
      </div>

      {/* Chi tiết kiện hàng */}
      <div className="bg-blue-50/50 rounded-lg p-2.5 space-y-2 text-[11px]">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">⚡ <span className="font-semibold">Gói 1 (Keychron VN):</span></span>
          <span className="font-bold text-blue-700">Hôm nay, 16:30 (NovaNow 2H)</span>
        </div>
        <div className="flex justify-between items-center border-t border-blue-100/60 pt-1.5">
          <span className="text-gray-500">Gói 2 (Coolmate Official):</span>
          <span className="text-gray-600">Dự kiến ngày mai, 14:00</span>
        </div>
      </div>
    </div>
  );
}