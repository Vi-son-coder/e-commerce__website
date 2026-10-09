export default function BreadcrumbAndStepper({ itemCount = 3 }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-semibold text-gray-900">Giỏ hàng của bạn</span>
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
          {itemCount} món
        </span>
      </div>
    </div>
  );
}
