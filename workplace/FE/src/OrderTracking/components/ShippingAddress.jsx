
export default function ShippingAddress() {
  return (
    <div className="bg-white p-6 rounded-xl border mb-6 space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-base">Địa chỉ nhận hàng</h2>
        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded">Văn phòng</span>
      </div>
      <p className="font-bold text-sm text-gray-900">Nguyễn Văn An</p>
      <p className="text-xs text-gray-600">📞 (+84) 987 654 321</p>
      <p className="text-xs text-gray-600">Tầng 5, Tòa nhà Bitexco, 02 Hải Triều, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
      <div className="bg-gray-100 text-gray-600 text-xs p-2 rounded mt-2">
        💬 <i>Ghi chú: "Giao trong giờ hành chính, gọi trước khi giao 10 phút."</i>
      </div>
    </div>
  );
}