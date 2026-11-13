import BreadcrumbAndStepper from "../components/BreadcrumbAndStepper";
import VoucherSection from "../components/VoucherSection";
import OrderSummary from "../components/OrderSummary";
import PaymentPage from "../../Payment/pages/PaymentPage";

import { getProductsInCart } from "../../../services/cart.service";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import CartList from "../components/CartList";
import { getCurrentUser } from "../../../services/auth.storage";

export default function CartPage() {
  const [productsInCart, setProductsInCart] = useState([]);

  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const productsInCart = await getProductsInCart();
      setProductsInCart(productsInCart);
    }
    getProducts();
  }, []);

  function handleRemove(productId) {
    let filterProductsInCart = productsInCart.filter(
      (item) => item._id != productId,
    );
    setProductsInCart(filterProductsInCart);
  }

  function handleSelectAll(isAllChecked) {
    const newChecked = !isAllChecked;
    setIsAllChecked(newChecked);
    const updateProducts = productsInCart.map((p) => ({
      ...p,
      checked: newChecked,
    }));
    setProductsInCart(updateProducts);
    console.log(newChecked);
  }

  function handleSelectOne(productId) {
    let updateProducts = productsInCart.map((p) =>
      p._id == productId ? { ...p, checked: p.checked ? !p.checked : true } : p,
    );
    setProductsInCart(updateProducts);
    setIsAllChecked(false);
  }

  async function updatePay(productId, quantity) {
    const updateProducts = productsInCart.map((p) =>
      p._id == productId ? { ...p, quantity: quantity } : p,
    );
    console.log(updateProducts);
    setProductsInCart(updateProducts);
  }
  return (
    <div className="cart-page">
      {/* Breadcrumb & Stepper Component */}

      <Routes>
        <Route
          index
          element={
            <>
              <BreadcrumbAndStepper itemCount={productsInCart.length} />

              {!getCurrentUser() ? (
                <section className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                  <h1 className="text-xl font-bold text-gray-900">
                    Đăng nhập để xem giỏ hàng
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Đăng nhập hoặc tạo tài khoản để lưu sản phẩm trong giỏ hàng.
                  </p>
                  <Link
                    className="mt-5 inline-flex rounded-lg bg-red-500 px-5 py-3 font-semibold text-white no-underline hover:bg-red-600"
                    to="/login?redirect=%2FCartPage"
                  >
                    Đăng nhập
                  </Link>
                </section>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* CỘT TRÁI */}
                <CartList
                  productsInCart={productsInCart}
                  handleRemove={handleRemove}
                  handleSelectOne={handleSelectOne}
                  updatePay={updatePay}
                  isAllChecked={isAllChecked}
                  handleSelectAll={handleSelectAll}
                />
                {/* CỘT PHẢI */}
                <div className="lg:col-span-4 space-y-4">
                  <VoucherSection />
                  <OrderSummary products={productsInCart} />
                </div>
              </div>
              )}
            </>
          }
        />
        {console.log(productsInCart)}
        <Route
          path="PaymentPage"
          element={<PaymentPage products={productsInCart} />}
        />
      </Routes>
    </div>
  );
}
