
export default function OrderStatusTracker() {
  const steps = [
    { label: 'Đã đặt đơn', time: '14:15, 28/05', completed: true },
    { label: 'Đã đóng gói', time: '14:30, 28/05', completed: true },
    { label: 'Đang giao hàng', time: '15:10, 28/05', active: true },
    { label: 'Đã giao hàng', time: 'Dự kiến 16:30', completed: false },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border mb-6 space-y-6">
      {/* Progress Bar Stepper */}
      <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
          <div className="h-full bg-blue-600 w-2/3"></div>
        </div>

        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center text-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
              step.completed || step.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step.completed ? '✓' : idx + 1}
            </div>
            <span className={`text-xs font-semibold mt-2 ${step.active ? 'text-blue-600' : 'text-gray-800'}`}>
              {step.label}
            </span>
            <span className="text-[11px] text-gray-400">{step.time}</span>
          </div>
        ))}
      </div>

      {/* Driver Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
            🛵
          </div>
          <div>
            <p className="font-semibold text-gray-900">Tài xế Nguyễn Văn Tuấn • <span className="text-gray-500">0912***889</span> <span className="bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded text-[10px]">NovaNow Express</span></p>
            <p className="text-gray-600">Đang di chuyển giao đến bạn. Vị trí hiện tại: <span className="font-semibold text-gray-800">Cách điểm nhận 2.4 km (khoảng 15 phút)</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 bg-white border rounded hover:bg-gray-50 text-gray-700 font-medium">Gọi tài xế</button>
          <button className="px-3 py-1.5 bg-blue-600 !text-white rounded hover:bg-blue-700 font-medium">Nhắn tin</button>
        </div>
      </div>
    </div>
  );
}