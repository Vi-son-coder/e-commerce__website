import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "./AuthContext";

// Backend không có bảng giỏ hàng: giỏ nằm ở client (localStorage), chỉ gửi lên khi checkout.
// Giá luôn được backend tính lại từ DB, nên giá trong giỏ chỉ để hiển thị.
const CART_KEY = "novamark_cart";
const CartContext = createContext(null);

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* bỏ qua */
    }
  }, [items]);

  const add = useCallback(
    (product, qty = 1) => {
      setItems((prev) => {
        const stock = Number(product.quantity ?? Infinity);
        const existing = prev.find((i) => i.product_id === product.product_id);
        if (existing) {
          return prev.map((i) =>
            i.product_id === product.product_id
              ? { ...i, price: Number(product.price), stock, quantity: Math.min(i.quantity + qty, stock) }
              : i
          );
        }
        return [
          ...prev,
          {
            product_id: product.product_id,
            product_name: product.product_name,
            image: product.image,
            price: Number(product.price),
            stock,
            quantity: Math.min(qty, stock),
          },
        ];
      });
      // Ghi hành vi cho hệ thống đề xuất
      if (user) api.logBehavior({ user_id: user.user_id, product_id: product.product_id, behavior_type: "add_to_cart" });
    },
    [user]
  );

  const setQty = useCallback(
    (productId, qty) =>
      setItems((prev) =>
        prev.map((i) =>
          i.product_id === productId ? { ...i, quantity: Math.max(1, Math.min(qty, i.stock || qty)) } : i
        )
      ),
    []
  );
  const remove = useCallback((productId) => setItems((prev) => prev.filter((i) => i.product_id !== productId)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      add,
      setQty,
      remove,
      clear,
      count: items.reduce((s, i) => s + i.quantity, 0),
      total: items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    [items, add, setQty, remove, clear]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
