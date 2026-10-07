import { useState } from "react";
import ContainerContent from "../component/ContainerContent/containerContent";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatVND } from "../lib/format";
import { navigate } from "../lib/useRoute";

export default function Checkout() {
  const { user, openAuth } = useAuth();
  const cart = useCart();
  const [address, setAddress] = useState(user?.address ?? "");
  const [pay, setPay] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null); // đơn hàng vừa tạo

  if (done) {
    return (
      <ContainerContent>
        <p className="font-bold text-2xl text-green-600">Đặt hàng thành công 🎉</p>
        <p>Mã đơn hàng: <strong>#{done.order_id}</strong> — Tổng tiền: <strong>{formatVND(done.total_amount)}</strong></p>
        <p className="text-sm text-gray-600">{done.THANHTOAN ? "Đã thanh toán." : "Thanh toán khi nhận hàng."}</p>
        <div className="flex gap-3">
          <button className="bg-[#004AC6] !text-white rounded-xl p-[10px_20px] cursor-pointer" onClick={() => navigate("/orders")}>Xem đơn hàng của tôi</button>
          <button className="bg-[#DBE1FF] !text-[#004AC6] rounded-xl p-[10px_20px] cursor-pointer" onClick={() => navigate("/")}>Tiếp tục mua sắm</button>
        </div>
      </ContainerContent>
    );
  }

  if (!user) {
    return (
      <ContainerContent>
        <p className="font-bold text-xl">Vui lòng đăng nhập để thanh toán</p>
        <button className="bg-[#004AC6] !text-white rounded-xl p-[10px_20px] w-fit cursor-pointer" onClick={() => openAuth("login")}>Đăng nhập</button>
      </ContainerContent>
    );
  }
  if (cart.items.length === 0) {
    return (
      <ContainerContent>
        <p className="font-bold text-xl">Giỏ hàng trống</p>
        <button className="bg-[#004AC6] !text-white rounded-xl p-[10px_20px] w-fit cursor-pointer" onClick={() => navigate("/")}>Tiếp tục mua sắm</button>
      </ContainerContent>
    );
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const order = await api.checkout({
        shipping_address: address,
        pay,
        items: cart.items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
      });
      cart.clear();
      setDone(order);
    } catch (err) {
      setError(err.message); // vd: "Not enough stock for ..." (409)
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-5">
      <div className="flex-1">
        <ContainerContent>
          <p className="font-bold text-xl">Thông tin giao hàng</p>
          <p className="text-sm text-gray-600">{user.full_name || user.username} · {user.phone || user.email}</p>
          <input
            className="border rounded-xl p-3 w-full focus:outline-none focus:border-blue-500"
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <p className="font-bold text-xl mt-2">Phương thức thanh toán</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={!pay} onChange={() => setPay(false)} /> Thanh toán khi nhận hàng (COD)
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={pay} onChange={() => setPay(true)} /> Thanh toán ngay (mô phỏng — chưa tích hợp cổng thanh toán)
          </label>
        </ContainerContent>
      </div>
      <div className="w-[380px]">
        <ContainerContent>
          <p className="font-bold text-xl">Đơn hàng</p>
          <ul className="flex flex-col gap-2 text-sm">
            {cart.items.map((i) => (
              <li key={i.product_id} className="flex justify-between gap-3">
                <span>{i.product_name} × {i.quantity}</span>
                <span>{formatVND(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t pt-3">
            <strong>Tổng cộng</strong>
            <strong className="text-[#004AC6] text-xl">{formatVND(cart.total)}</strong>
          </div>
          <p className="text-xs text-gray-500">Giá cuối cùng được máy chủ tính lại theo giá hiện tại của sản phẩm.</p>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="bg-[#004AC6] !text-white font-bold rounded-xl p-3 cursor-pointer disabled:opacity-60">
            {busy ? "Đang đặt hàng..." : "Đặt hàng"}
          </button>
        </ContainerContent>
      </div>
    </form>
  );
}
