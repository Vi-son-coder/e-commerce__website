import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatVndNumber } from "../../../utils/currency";

const FILTER_KEYS = [
  "brand",
  "minPrice",
  "maxPrice",
  "minRating",
  "minDiscount",
];

export default function SidebarFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [minPrice, setMinPrice] = useState(
    formatPriceInput(searchParams.get("minPrice") || ""),
  );
  const [maxPrice, setMaxPrice] = useState(
    formatPriceInput(searchParams.get("maxPrice") || ""),
  );
  const [minRating, setMinRating] = useState(
    searchParams.get("minRating") || "",
  );
  const [minDiscount, setMinDiscount] = useState(
    searchParams.get("minDiscount") || "",
  );

  function formatPriceInput(value) {
    const digits = value.replace(/\D/g, "");
    return digits ? formatVndNumber(digits) : "";
  }

  function getPriceDigits(value) {
    return value.replace(/\D/g, "");
  }

  function applyFilters(event) {
    event.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    const filters = {
      brand,
      minPrice: getPriceDigits(minPrice),
      maxPrice: getPriceDigits(maxPrice),
      minRating,
      minDiscount,
    };

    for (const [key, value] of Object.entries(filters)) {
      if (value) nextParams.set(key, value);
      else nextParams.delete(key);
    }

    setSearchParams(nextParams);
  }

  function resetFilters() {
    const nextParams = new URLSearchParams(searchParams);
    FILTER_KEYS.forEach((key) => nextParams.delete(key));
    setSearchParams(nextParams);
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setMinDiscount("");
  }

  return (
    <aside className="market-filter-panel w-64 bg-white p-4 rounded-lg shadow-sm space-y-6 text-xs text-gray-700">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="font-bold text-sm text-gray-800">Bộ lọc tìm kiếm</h3>
        <button
          type="button"
          onClick={resetFilters}
          className="text-blue-600 text-xs hover:underline"
        >
          Thiết lập lại
        </button>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold mb-2 text-gray-800">Thương hiệu</h4>
        <input
          type="search"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          placeholder="Nhập thương hiệu"
          className="w-full border rounded p-2"
        />
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold mb-2 text-gray-800">Khoảng giá (đ)</h4>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            inputMode="numeric"
            value={minPrice}
            onChange={(event) => setMinPrice(formatPriceInput(event.target.value))}
            placeholder="Từ"
            aria-label="Giá tối thiểu"
            className="w-full min-w-0 border rounded p-2 text-center"
          />
          <span>-</span>
          <input
            type="text"
            inputMode="numeric"
            value={maxPrice}
            onChange={(event) => setMaxPrice(formatPriceInput(event.target.value))}
            placeholder="Đến"
            aria-label="Giá tối đa"
            className="w-full min-w-0 border rounded p-2 text-center"
          />
        </div>
      </div>

      <div className="border-b pb-4">
        <h4 className="font-semibold mb-2 text-gray-800">Đánh giá sao</h4>
        <div className="space-y-2">
          {[5, 4].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="minRating"
                value={rating}
                checked={minRating === String(rating)}
                onChange={() => setMinRating(String(rating))}
              />
              <span className="text-yellow-500">{"★".repeat(rating)}</span>
              <span>Từ {rating} sao</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="minRating"
              value=""
              checked={!minRating}
              onChange={() => setMinRating("")}
            />
            <span>Tất cả mức đánh giá</span>
          </label>
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={minDiscount === "20"}
          onChange={(event) => setMinDiscount(event.target.checked ? "20" : "")}
        />
        <span>Đang giảm giá từ 20%</span>
      </label>

      <button
        type="button"
        onClick={applyFilters}
        className="w-full bg-blue-600 !text-white py-2 rounded font-medium hover:bg-blue-700"
      >
        Áp dụng bộ lọc
      </button>
    </aside>
  );
}
