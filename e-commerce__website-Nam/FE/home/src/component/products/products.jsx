import { PLACEHOLDER_IMG } from "../../lib/format";

// Các prop cũ giữ nguyên. Prop mới (đều tùy chọn): onOpen, onAdd, soldOut.
// percen / avergeRating / sold / price (giá gốc) chỉ hiển thị khi có dữ liệu
// (schema backend hiện chưa có giảm giá / đánh giá / lượt bán).
function Product({
  percen,
  pic,
  brand,
  name,
  avergeRating,
  sold,
  priceSale,
  price,
  onOpen,
  onAdd,
  soldOut,
}) {
  return (
    <div
      className={`bg-[#FAF8FF] p-3 w-fit rounded-xl shrink-0 ${onOpen ? "cursor-pointer" : ""}`}
      onClick={onOpen}
    >
      <div className="relative">
        {percen ? (
          <p className="absolute rounded-sm p-[0_7px] text-white text-[12px] font-medium bg-[#BA1A1A] top-2 left-2">{`${percen}%`}</p>
        ) : null}
        {soldOut ? (
          <p className="absolute rounded-sm p-[0_7px] text-white text-[12px] font-medium bg-gray-600 top-2 right-2">Hết hàng</p>
        ) : null}
        <img
          src={pic}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER_IMG;
          }}
          className="object-cover w-50 h-50 rounded-xl"
        />
      </div>
      <p className="text-[#787983] text-sm">{brand}</p>
      <p className="text-[20px] font-medium">{name}</p>
      {avergeRating != null ? (
      <div className="flex items-center gap-1 text-[12px] mt-4">
        {
          <>
            <svg
              className="w-4 h-4 text-amber-400 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <p className="font-bold">{avergeRating}</p>
            <p className="text-[#73747f] font-medium">{`(${sold} đã bán)`}</p>
          </>
        }
      </div>
      ) : null}
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-[#004AC6] font-bold text-xl">{`${priceSale}đ`}</p>
          {price ? <p className="line-through text-[#a4a6b3] text-[13px]">{`${price}đ`}</p> : null}
        </div>
        <button
          type="button"
          title="Thêm vào giỏ"
          disabled={soldOut}
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.();
          }}
          className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 p-2 rounded-[8px] bg-[#DBE1FF]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        </button>
      </div>
    </div>
  );
}

export default Product;
