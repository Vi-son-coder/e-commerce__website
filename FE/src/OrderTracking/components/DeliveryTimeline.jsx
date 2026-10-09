
export default function DeliveryTimeline() {
  const events = [
    {
      time: '15:10',
      title: 'Shipper đã nhận hàng và đang di chuyển giao',
      desc: 'Xuất phát từ Kho trung chuyển Quận Tân Bình. Ước tính đến lúc 16:25.',
      active: true,
    },
    {
      time: '14:45',
      title: 'Đơn hàng đã xuất kho phân loại trung tâm TP.HCM',
      desc: 'Đã đóng bao niêm phong an toàn và bàn giao bưu tá NovaNow.',
    },
    {
      time: '14:30',
      title: 'Người bán Keychron Vietnam & Coolmate hoàn tất đóng gói',
      desc: 'Kiểm tra tem niêm phong điện tử và dán mã vận đơn hỏa tốc.',
    },
    {
      time: '14:15',
      title: 'Đơn hàng được tạo thành công',
      desc: 'Hệ thống NovaMart xác nhận thanh toán trực tuyến qua Ví MoMo.',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-base">Chi tiết lộ trình vận chuyển</h2>
        <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">Cập nhật trực tiếp</span>
      </div>

      <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
        {events.map((evt, idx) => (
          <div key={idx} className="mb-6 ml-6 relative">
            <span className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
              evt.active ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-gray-300'
            }`}></span>
            <div className="text-xs">
              <span className={`font-bold mr-2 ${evt.active ? 'text-blue-600' : 'text-gray-900'}`}>{evt.time}</span>
              <span className={`font-semibold ${evt.active ? 'text-blue-600' : 'text-gray-800'}`}>{evt.title}</span>
              <p className="text-gray-500 mt-1">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}