

export const CustomerCareColumn = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-gray-900">Chăm sóc khách hàng</h3>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          Hotline miễn phí:{' '}
          <a href="tel:1800NOVAMART" className="font-medium text-blue-600 hover:underline">
            1-800-NOVAMART
          </a>
        </p>
        <p>
          Hỗ trợ khách hàng:{' '}
          <a href="mailto:cskh@novamart.vn" className="text-gray-700 hover:underline">
            cskh@novamart.vn
          </a>
        </p>
        <p>Giờ làm việc: 08:00 - 21:00 (Thứ 2 - CN)</p>
      </div>

      <div className="mt-1 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
        <button className="rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200 transition-colors">
          Trung tâm hỗ trợ
        </button>
        <button className="rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200 transition-colors">
          Chính sách đổi trả
        </button>
      </div>
    </div>
  );
};