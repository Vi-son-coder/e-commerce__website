export default function FilterChips() {
  const chips = [
    "Giao Hỏa Tốc 2H",
    "Thương hiệu: Keychron, Akko",
    "Giá: 1.000.000đ - 3.500.000đ",
    "Đánh giá: từ 4 sao",
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 py-2 text-xs bg-white px-3 rounded-[7px] shadow">
      <div className="flex items-center gap-1 text-[#787983]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>

        <span className="font-semibold">ĐANG LỌC:</span>
      </div>

      {chips.map((chip, index) => (
        <span
          key={index}
          className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200 flex items-center space-x-1"
        >
          <span>{chip}</span>
          <button className="font-bold hover:text-blue-800 cursor-pointer">×</button>
        </span>
      ))}
      <button className="!text-red-600 hover:underline ml-auto font-medium">
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
}
