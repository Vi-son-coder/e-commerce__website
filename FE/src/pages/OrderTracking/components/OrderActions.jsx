
export default function OrderActions() {
  return (
    <div className="space-y-3">
      <button className="w-full bg-blue-600 hover:bg-blue-700 !text-white font-bold py-2.5 rounded-lg text-sm transition">
        🎧 Liên hệ tài xế / Hỗ trợ giao hàng
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button className="border bg-white hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-xs font-semibold text-center">
          ❓ Yêu cầu trợ giúp CSKH
        </button>
        <button className="border bg-white hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-xs font-semibold text-center">
          📄 Hóa đơn điện tử VAT
        </button>
      </div>

      <p className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-lg border">
        ℹ️ <b>Lưu ý:</b> Đơn hàng đã xuất kho và đang trên đường giao nên không thể tự hủy trực tiếp. Vui lòng liên hệ hotline <b>1900 8899</b> hoặc trao đổi với tài xế nếu cần thay đổi giờ nhận.
      </p>
    </div>
  );
}