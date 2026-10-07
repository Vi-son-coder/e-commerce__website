import ContainerContent from "../component/ContainerContent/containerContent";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatVND, PLACEHOLDER_IMG, resolveImage } from "../lib/format";
import { navigate } from "../lib/useRoute";

export default function Cart() {
  const cart = useCart();
  const { user, openAuth } = useAuth();

  if (cart.items.length === 0) {
    return (
      <ContainerContent>
        <p className="font-bold text-xl">Giỏ hàng của bạn đang trống</p>
        <button className="bg-[#004AC6] !text-white rounded-xl p-[10px_20px] w-fit cursor-pointer" onClick={() => navigate("/")}>
          Tiếp tục mua sắm
        </button>
      </ContainerContent>
    );
  }

  return (
    <ContainerContent>
      <div className="flex gap-1 items-center">
        <div className="w-2 h-6 rounded-2xl bg-[#004AC6]"></div>
        <p className="font-bold text-xl">Giỏ hàng ({cart.count} sản phẩm)</p>
      </div>
      <ul className="flex flex-col gap-3">
        {cart.items.map((i) => (
          <li key={i.product_id} className="flex items-center gap-4 bg-[#FAF8FF] p-3 rounded-xl">
            <img
              src={resolveImage(i.image)}
              alt=""
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMG; }}
              className="size-20 object-cover rounded-xl cursor-pointer"
              onClick={() => navigate(`/product/${i.product_id}`)}
            />
            <div className="flex-1">
              <p className="font-medium cursor-pointer" onClick={() => navigate(`/product/${i.product_id}`)}>{i.product_name}</p>
              <p className="text-[#004AC6] font-bold">{formatVND(i.price)}</p>
            </div>
            <div className="flex items-center border rounded-xl bg-white">
              <button className="px-3 py-1 cursor-pointer" onClick={() => cart.setQty(i.product_id, i.quantity - 1)}>-</button>
              <span className="px-3">{i.quantity}</span>
              <button className="px-3 py-1 cursor-pointer" onClick={() => cart.setQty(i.product_id, i.quantity + 1)}>+</button>
            </div>
            <p className="w-32 text-right font-bold">{formatVND(i.price * i.quantity)}</p>
            <button className="!text-red-500 text-sm cursor-pointer" onClick={() => cart.remove(i.product_id)}>Xóa</button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <button className="text-sm cursor-pointer" onClick={() => navigate("/")}>{"< Tiếp tục mua sắm"}</button>
        <div className="flex items-center gap-6">
          <p>Tạm tính: <strong className="text-xl text-[#004AC6]">{formatVND(cart.total)}</strong></p>
          <button
            className="bg-[#004AC6] !text-white font-bold rounded-xl p-[10px_24px] cursor-pointer"
            onClick={() => (user ? navigate("/checkout") : openAuth("login"))}
          >
            {user ? "Thanh toán" : "Đăng nhập để thanh toán"}
          </button>
        </div>
      </div>
    </ContainerContent>
  );
}
