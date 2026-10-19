import BreadcrumbAndStepper from "../components/BreadcrumbAndStepper";
import VoucherSection from "../components/VoucherSection";
import OrderSummary from "../components/OrderSummary";
import PaymentPage from "../../Payment/pages/PaymentPage";

import { getProductsInCart } from "../../../services/cart.service";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CartList from "../components/CartList";

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
    <div className=" mt-13">
      {/* Breadcrumb & Stepper Component */}

      <Routes>
        <Route
          index
          element={
            <>
              <BreadcrumbAndStepper itemCount={productsInCart.length} />

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
            </>
          }
        />
        <Route path="PaymentPage" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}
