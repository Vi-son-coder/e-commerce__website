import { Link } from "react-router-dom";

export default function OrderActionBar() {
  return (
    <div className="space-y-3 mb-6">
      {/* Box danh sách tóm tắt các món */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 text-xs text-gray-700">
          <span className="text-lg">🛍️</span>
          <div>
            <span className="font-bold">Gồm:</span> Keychron K2 Pro, Chuột Master 3S, Bộ Coolmate Active
            <p className="text-[11px] text-blue-600 font-medium mt-0.5">Lộ trình giao hàng trực tuyến cập nhật 24/7 qua GPS</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link to='/'>
            <button className="flex-1 md:flex-none border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs transition">
              📰 Tiếp Tục Mua Sắm
            </button>
          </Link>
          <Link to="/OrderTrackingPage">
            <button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 !text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1">
              🔍 Theo Dõi Đơn Hàng
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center items-center gap-6 text-[11px] text-gray-400">
        <button className="hover:underline flex items-center gap-1">📄 Xuất hóa đơn điện tử VAT</button>
        <span>•</span>
        <button className="hover:underline flex items-center gap-1">📥 Tải phiếu giao hàng PDF</button>
        <span>•</span>
        <button className="hover:underline flex items-center gap-1">🎧 Cần hỗ trợ đơn hàng này? (1900 8899)</button>
      </div>
    </div>
  );
}