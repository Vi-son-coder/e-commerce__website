import { useState } from 'react';

export default function PaymentMethods() {
  const [selected, setSelected] = useState('momo');

  const methods = [
    { id: 'momo', name: 'Ví điện tử MoMo', desc: 'Đã liên kết: 0987***321', badge: '-20K ƯU ĐÃI' },
    { id: 'vnpay', name: 'VNPAY-QR / Mobile Banking', desc: 'Quét mã QR qua hơn 40 ứng dụng ngân hàng', badge: 'Tiện lợi' },
    { id: 'card', name: 'Thẻ Quốc Tế (Visa / Mastercard / JCB)', desc: 'Miễn phí thanh toán quốc tế' },
    { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', desc: 'Kiểm tra hàng trước khi thanh toán tiền mặt' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 uppercase text-sm flex items-center gap-2">
          💳 PHƯƠNG THỨC THANH TOÁN
        </h2>
        <span className="text-emerald-600 text-xs flex items-center gap-1 font-medium">
          🛡️ Bảo mật đa tầng SSL 256-bit
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {methods.map((m) => (
          <label
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`border rounded-xl p-3 flex items-start gap-3 cursor-pointer transition-all ${
              selected === m.id ? 'border-blue-600 bg-blue-50/20' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input type="radio" name="payment" checked={selected === m.id} onChange={() => {}} className="mt-1" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800 text-xs">{m.name}</span>
                {m.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    m.id === 'momo' ? 'bg-red-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {m.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">{m.desc}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-2.5 flex justify-between items-center text-xs text-gray-500">
        <span>🔒 Thông tin thanh toán được mã hóa và bảo vệ an toàn tuyệt đối bởi NovaMart PayGuard.</span>
        <a href="#" className="text-blue-600 font-medium hover:underline shrink-0 ml-2">Chi tiết chính sách</a>
      </div>
    </div>
  );
}