import { Link } from "react-router-dom";
import "./products.css";
import { trackAction } from "../../../services/tracking.service";
import { convertUsdToVnd, formatVnd } from "../../../utils/currency";

function Product({
  id,
  title,
  brand,
  price,
  discountPercentage,
  rating,
  images = [],
  sold,
  bgVoucherColor,
  voucher,
  textVoucherColor,
  textColorPrice,
  textColorPriceSale,
  bgColor,
  isFlashSale = false,
}) {
  const priceInVnd = convertUsdToVnd(price);
  const newPrice = (priceInVnd * (100 - discountPercentage)) / 100;
  return (
    <Link to={`/ProductDetailPage?productId=${id}`}>
      <div
        style={{ background: bgColor }}
        className={`flex flex-col p-3 w-fit rounded-xl shrink-0 min-w-[170px] max-w-[180px] gap-1 h-full${isFlashSale ? " market-flash-card" : ""}`}
        onClick={() => trackAction("VIEW_PRODUCT", id)}
      >
        <div className={`relative${isFlashSale ? " market-flash-card-image" : ""}`}>
          <p className={`absolute rounded-sm p-[0_7px] text-white text-[12px] font-medium bg-[#F45B24] top-2 left-2${isFlashSale ? " market-flash-discount" : ""}`}>{`-${discountPercentage}%`}</p>
          <img
            src={images[0]}
            alt=""
            className="market-product-image object-cover rounded-[15px] aspect-square border-1 border-[#efefef8a]"
          />
        </div>
        <p className="market-product-brand text-[#787983] text-sm">{brand}</p>
        <p className="market-product-title text-[20px] font-medium line-clamp-2 flex-1">{title}</p>
        <p
          className="rounded-sm font-medium w-fit p-[0_9px] text-[11px] mt-4"
          style={{ backgroundColor: bgVoucherColor, color: textVoucherColor }}
        >
          {voucher}
        </p>
        <div className="flex items-center gap-1 text-[12px] ">
          {
            <>
              <svg
                className="w-4 h-4 text-amber-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <p className="font-bold">{rating}</p>
              <p className="text-[#73747f] font-medium">{`(${sold} đã bán)`}</p>
            </>
          }
        </div>
        <div className={`flex justify-between items-center${isFlashSale ? " market-flash-price-row" : ""}`}>
          <div className="flex flex-col gap-1 text-left">
            <p
              style={{ color: textColorPriceSale }}
              className="market-product-price font-bold text-xl"
            >{formatVnd(newPrice)}</p>
            <p
              style={{ color: textColorPrice }}
              className="line-through text-[13px]"
            >{price ? formatVnd(priceInVnd) : " "}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="market-product-cart size-8 p-2 rounded-[8px] bg-[#DBE1FF]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
        {isFlashSale && (
          <div className="market-flash-status" aria-label="Đang bán chạy">
            <span aria-hidden="true">🔥</span>
            <strong>ĐANG BÁN CHẠY</strong>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Product;
