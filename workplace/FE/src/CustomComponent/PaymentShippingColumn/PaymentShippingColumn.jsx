
export const PaymentShippingColumn = () => {
  const paymentMethods = [
    { name: 'Visa', bg: 'bg-slate-100', text: 'text-slate-800' },
    { name: 'Mastercard', bg: 'bg-slate-100', text: 'text-slate-800' },
    { name: 'MoMo', bg: 'bg-purple-100', text: 'text-purple-800' },
    { name: 'VNPay', bg: 'bg-blue-100', text: 'text-blue-800' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-gray-900">Thanh toán & Vận chuyển</h3>
      <p className="text-sm text-gray-600">Hỗ trợ các phương thức giao dịch đa kênh:</p>

      {/* Danh sách thẻ thanh toán */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {paymentMethods.map((method, index) => (
          <span
            key={index}
            className={`rounded-md px-3 py-1.5 ${method.bg} ${method.text}`}
          >
            {method.name}
          </span>
        ))}
      </div>

      {/* Badge giao hàng hỏa tốc */}
      <div className="mt-2 w-fit rounded-lg bg-emerald-300 px-3 py-2 text-xs font-bold text-emerald-950">
        Giao hàng hỏa tốc 2H toàn quốc
      </div>
    </div>
  );
};