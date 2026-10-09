

export default function OrderItemsList() {
  const items = [
    {
      id: 1,
      shop: 'Keychron Vietnam Official',
      isMall: true,
      name: 'Bàn Phím Cơ Không Dây Keychron Q1 Pro QMK/VIA',
      variant: 'Carbon Black / Red Switch',
      sku: 'KC-Q1P-BK-RD',
      price: '4.290.000đ',
      qty: 1,
      img: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      shop: 'Coolmate Official Store',
      isMall: true,
      name: 'Áo Thun Nam Cotton Compact Siêu Mềm Thoáng Khí',
      variant: 'Xanh Navy - Size L',
      sku: 'CM-TSH-CP-NVY-L',
      price: '518.000đ',
      qty: 2,
      unitPrice: '259.000đ/áo',
      img: 'https://via.placeholder.com/80',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-base">Danh sách sản phẩm trong đơn <span className="text-gray-400 font-normal text-xs">(2 kiện)</span></h2>
        <span className="text-xs text-gray-500">Đồng kiểm khi nhận hàng</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-50 p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded border bg-white" />
              <div>
                {item.isMall && <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-1.5">MALL</span>}
                <span className="text-xs text-gray-500">{item.shop}</span>
                <h3 className="text-xs font-bold text-gray-900 mt-0.5">{item.name}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Phân loại: {item.variant} | SKU: {item.sku}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-sm text-gray-900">{item.price}</p>
              <p className="text-[11px] text-gray-400">Số lượng: x{item.qty} {item.unitPrice && `(${item.unitPrice})`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}