import { useEffect, useRef, useState } from "react";
import ContainerContent from "../component/ContainerContent/containerContent";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatVND, PLACEHOLDER_IMG, resolveImage } from "../lib/format";
import { navigate } from "../lib/useRoute";

export default function ProductDetail({ id }) {
  const { user } = useAuth();
  const cart = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const openedAt = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    setProduct(null);
    setError("");
    setQty(1);
    api
      .product(id)
      .then((p) => !cancelled && setProduct(p))
      .catch((e) => !cancelled && setError(e.status === 404 ? "Không tìm thấy sản phẩm" : e.message));
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Ghi hành vi "view" (kèm thời gian xem, giây) cho hệ thống đề xuất khi rời trang.
  // Bỏ qua lượt xem < 2s (cũng tránh ghi trùng do StrictMode ở môi trường dev).
  useEffect(() => {
    openedAt.current = Date.now();
    const userId = user?.user_id;
    return () => {
      const seconds = Math.round((Date.now() - openedAt.current) / 1000);
      if (userId && seconds >= 2) {
        api.logBehavior({ user_id: userId, product_id: Number(id), behavior_type: "view", duration: seconds });
      }
    };
  }, [id, user?.user_id]);

  if (error) {
    return (
      <ContainerContent>
        <p className="text-red-600">{error}</p>
        <button className="!text-[#004AC6] font-medium text-sm cursor-pointer w-fit" onClick={() => navigate("/")}>{"< Về trang chủ"}</button>
      </ContainerContent>
    );
  }
  if (!product) return <ContainerContent><p className="text-gray-500">Đang tải...</p></ContainerContent>;

  const available = product.status === "active" && product.quantity > 0;

  function addToCart() {
    cart.add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <button className="!text-[#004AC6] font-medium text-sm cursor-pointer mt-6" onClick={() => navigate("/")}>{"< Tiếp tục mua sắm"}</button>
      <ContainerContent>
        <div className="flex gap-8">
          <img
            src={resolveImage(product.image)}
            alt={product.product_name}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMG; }}
            className="object-cover w-[420px] h-[420px] rounded-2xl bg-[#FAF8FF]"
          />
          <div className="flex flex-col gap-4 flex-1">
            {product.DANHMUC && (
              <p className="text-violet-900 bg-violet-200 font-medium text-[12px] w-fit p-[0_10px] rounded-2xl">{product.DANHMUC.category_name}</p>
            )}
            <h1 className="font-bold text-3xl">{product.product_name}</h1>
            <p className="text-[#004AC6] font-bold text-3xl">{formatVND(product.price)}</p>
            <p className="text-gray-700">{product.description || "Chưa có mô tả cho sản phẩm này."}</p>
            <p className="text-sm text-gray-500">
              {available ? `Còn ${product.quantity} sản phẩm` : "Hiện đã hết hàng / ngừng bán"}
            </p>

            {available && (
              <div className="flex items-center gap-3">
                <span className="text-sm">Số lượng</span>
                <div className="flex items-center border rounded-xl">
                  <button className="px-3 py-1 cursor-pointer" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                  <span className="px-3">{qty}</span>
                  <button className="px-3 py-1 cursor-pointer" onClick={() => setQty(Math.min(product.quantity, qty + 1))}>+</button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                disabled={!available}
                onClick={addToCart}
                className="bg-[#DBE1FF] !text-[#004AC6] font-bold p-[10px_20px] rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {added ? "Đã thêm ✓" : "Thêm vào giỏ"}
              </button>
              <button
                disabled={!available}
                onClick={() => { cart.add(product, qty); navigate("/checkout"); }}
                className="bg-[#004AC6] !text-white font-bold p-[10px_20px] rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </ContainerContent>
    </>
  );
}
