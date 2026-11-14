import { useSearchParams } from "react-router-dom";
import { formatVnd } from "../../../utils/currency";

export default function FilterChips() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chips = [];

  if (searchParams.has("brand")) {
    chips.push({
      key: "brand",
      label: `Thương hiệu: ${searchParams.get("brand")}`,
    });
  }
  if (searchParams.has("minPrice") || searchParams.has("maxPrice")) {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    chips.push({
      key: "price",
      label: `Giá: ${minPrice ? formatVnd(minPrice) : "0đ"} - ${maxPrice ? formatVnd(maxPrice) : "không giới hạn"}`,
      params: ["minPrice", "maxPrice"],
    });
  }
  if (searchParams.has("minRating")) {
    chips.push({
      key: "minRating",
      label: `Đánh giá: từ ${searchParams.get("minRating")} sao`,
    });
  }
  if (searchParams.has("minDiscount")) {
    chips.push({
      key: "minDiscount",
      label: `Giảm giá từ ${searchParams.get("minDiscount")}%`,
    });
  }

  function removeChip(chip) {
    const nextParams = new URLSearchParams(searchParams);
    (chip.params || [chip.key]).forEach((key) => nextParams.delete(key));
    setSearchParams(nextParams);
  }

  function clearFilters() {
    const nextParams = new URLSearchParams(searchParams);
    ["brand", "minPrice", "maxPrice", "minRating", "minDiscount"].forEach(
      (key) => nextParams.delete(key),
    );
    setSearchParams(nextParams);
  }

  if (!chips.length) return null;

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

      {chips.map((chip) => (
        <span
          key={chip.key}
          className="bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200 flex items-center space-x-1"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            aria-label={`Xóa bộ lọc ${chip.label}`}
            onClick={() => removeChip(chip)}
            className="font-bold hover:text-blue-800 cursor-pointer"
          >
            ×
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={clearFilters}
        className="!text-red-600 hover:underline ml-auto font-medium"
      >
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
}
