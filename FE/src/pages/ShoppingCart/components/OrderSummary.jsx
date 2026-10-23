import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NotificationModule from "../../../components/ComponentTemplates/NotificationModule";
export default function OrderSummary({ products }) {
  const [priceTemporary, setPriceTemporary] = useState(0);
  const [quantityProducts, setQuantityProducts] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [show, setShow] = useState(false);
  const Notification = useRef(null);
  useEffect(() => {
    async function payment() {
      const selectProducts = products.filter((p) => p.checked == true);
      await setQuantityProducts(selectProducts.length);
      let priceTem = 0;
      let priceDiscount = 0;

      selectProducts.forEach((p) => {
        priceTem += p.price * p.quantity;
        priceDiscount += (p.price * p.discountPercentage * p.quantity) / 100;
      });
      await setPriceTemporary(priceTem.toFixed(0));
      await setDiscount(priceDiscount.toFixed(0));
      await setTotalPrice(priceTem.toFixed(0) - priceDiscount.toFixed(0));
    }
    payment();
  }, [products]);
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h3 className="font-bold text-gray-900 text-base">Tóm tắt đơn hàng</h3>

      <div className="space-y-2.5 text-sm border-b border-gray-100 pb-4">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính ({quantityProducts} sản phẩm):</span>
          <span className="font-bold text-gray-900">{priceTemporary}.000đ</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-medium">
          <span>🎁 Giảm giá sản phẩm:</span>
          <span className="font-bold">-{discount}.000đ</span>
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="bg-slate-50 p-4 rounded-xl space-y-1">
        <div className="flex justify-between items-baseline">
          <span className="font-bold text-gray-900 text-sm">
            Tổng thanh toán:
          </span>
          <span className="text-2xl font-black text-red-600">
            {totalPrice}.000đ
          </span>
        </div>
      </div>

      <div>
        {quantityProducts == 0 ? (
          <button
            className="w-full bg-blue-600  font-bold py-3.5 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200 !text-white 
            cursor-pointer
            "
            onClick={() => {
              setShow(true);
              clearTimeout(Notification.current);
              Notification.current = setTimeout(() => {
                setShow(false);
              }, 2500);
            }}
          >
            Tiến Hành Thanh Toán
          </button>
        ) : (
          <Link to="PaymentPage">
            <button className="w-full bg-blue-600  font-bold py-3.5 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200 !text-white cursor-pointer">
              Tiến Hành Thanh Toán
            </button>
          </Link>
        )}
      </div>

      <div className="flex justify-center items-center gap-6 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <span className="flex items-center gap-1">Bảo mật SSL 256-bit</span>
        <span className="flex items-center gap-1">Đổi trả 30 ngày free</span>
      </div>
      {show && (
        <NotificationModule
          message={"Vui lòng chọn sản phẩm cần thanh toán!"}
        />
      )}
    </div>
  );
}
