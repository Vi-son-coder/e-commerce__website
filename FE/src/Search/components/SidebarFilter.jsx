export default function SidebarFilter() {
  return (
    <aside className="w-64 bg-white p-4 rounded-lg shadow-sm space-y-6 text-xs text-gray-700">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-sm text-gray-800">Bộ lọc tìm kiếm</h3>
        <button className="text-blue-600 text-xs hover:underline">Thiết lập lại</button>
      </div>

      {/* Dịch vụ & Khuyến mãi */}
      <div>
        <h4 className="font-semibold mb-2 text-gray-800">Dịch vụ & Khuyến mãi</h4>
        <div className="space-y-1.5">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-blue-600" />
            <span className="text-blue-600 font-medium">⚡ Giao hỏa tốc 2H (NovaNow)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-blue-600" />
            <span>NovaMall Chính Hãng</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-blue-600" />
            <span>Đang giảm giá sốc (-20% trở lên)</span>
          </label>
        </div>
      </div>

      {/* Khoảng Giá */}
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2 text-gray-800">Khoảng Giá (đ)</h4>
        <div className="flex items-center space-x-2 mb-2">
          <input type="text" placeholder="1.000.000" className="w-full border rounded p-1 text-center" />
          <span>-</span>
          <input type="text" placeholder="3.500.000" className="w-full border rounded p-1 text-center" />
        </div>
        <button className="w-full bg-blue-600 text-white py-1.5 rounded font-medium hover:bg-blue-700">
          Áp dụng khoảng giá
        </button>
      </div>

      {/* Đánh giá sao */}
      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2 text-gray-800">Đánh giá sao</h4>
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-1">
              <input type="radio" name="star" />
              <span className="text-yellow-400">★★★★★</span>
              <span>Từ 5 sao</span>
            </div>
            <span className="text-gray-400">310</span>
          </label>
          <label className="flex items-center justify-between cursor-pointer bg-blue-50 p-1 rounded">
            <div className="flex items-center space-x-1">
              <input type="radio" name="star" defaultChecked />
              <span className="text-yellow-400">★★★★☆</span>
              <span className="font-medium text-blue-700">Từ 4 sao</span>
            </div>
            <span className="text-blue-700 font-medium">890</span>
          </label>
        </div>
      </div>
    </aside>
  );
}