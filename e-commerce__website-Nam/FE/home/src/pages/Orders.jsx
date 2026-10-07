import { useEffect, useState } from "react";
import ContainerContent from "../component/ContainerContent/containerContent";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { formatDate, formatVND } from "../lib/format";
import { navigate } from "../lib/useRoute";

export default function Orders() {
  const { user, openAuth, checking } = useAuth();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    api
      .myOrders()
      .then((o) => !cancelled && setOrders(o))
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (checking) return <ContainerContent><p className="text-gray-500">Đang tải...</p></ContainerContent>;
  if (!user) {
    return (
      <ContainerContent>
        <p className="font-bold text-xl">Đăng nhập để xem đơn hàng của bạn</p>
        <button className="bg-[#004AC6] !text-white rounded-xl p-[10px_20px] w-fit cursor-pointer" onClick={() => openAuth("login")}>Đăng nhập</button>
      </ContainerContent>
    );
  }

  return (
    <ContainerContent>
      <div className="flex gap-1 items-center">
        <div className="w-2 h-6 rounded-2xl bg-[#004AC6]"></div>
        <p className="font-bold text-xl">Đơn hàng của tôi</p>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {!orders && !error && <p className="text-gray-500">Đang tải...</p>}
      {orders && orders.length === 0 && (
        <>
          <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
          <button className="bg-[#004AC6] !text-white rounded-xl p-[10px_20px] w-fit cursor-pointer" onClick={() => navigate("/")}>Mua sắm ngay</button>
        </>
      )}
      <ul className="flex flex-col gap-4">
        {orders?.map((o) => (
          <li key={o.order_id} className="bg-[#FAF8FF] rounded-xl p-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <strong>Đơn #{o.order_id}</strong>
              <span className="text-gray-600">{formatDate(o.order_date)}</span>
            </div>
            <ul className="text-sm flex flex-col gap-1">
              {o.CHITIETDONHANG.map((d) => (
                <li key={d.order_detail_id} className="flex justify-between">
                  <span>{d.SANPHAM?.product_name ?? `Sản phẩm #${d.product_id}`} × {d.quantity}</span>
                  <span>{formatVND(d.price * d.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-sm border-t pt-2">
              <span className={o.THANHTOAN ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                {o.THANHTOAN ? "Đã thanh toán" : "Chưa thanh toán (COD)"}
              </span>
              <span>Giao đến: {o.shipping_address}</span>
              <strong className="text-[#004AC6]">{formatVND(o.total_amount)}</strong>
            </div>
          </li>
        ))}
      </ul>
    </ContainerContent>
  );
}
