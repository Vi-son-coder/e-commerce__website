import "./App.css";
import Content from "./home/content/content";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import SearchResultPage from "./Search/pages/SearchResultPage";
import ProductDetailPage from "./ProductDetailPage/pages/ProductDetailPage";
import CartPage from "./ShoppingCart/pages/CartPage";
import PaymentPage from "./Payment/pages/PaymentPage";
import ConfirmPaymentPage from "./ConfirmPayment/pages/ConfirmPaymentPage";
import OrderTrackingPage from "./OrderTracking/page/OrderTrackingPage";

function App() {
  return (
    <>
      <Routes>
        {/* Route Cha chứa Layout chung */}
        <Route path="/" element={<MainLayout />}>
          {/*index: Trang chủ mặc định -> rơi vào vị trí Outlet */}
          <Route index element={<Content />} />
          <Route path="SearchResultPage" element={<SearchResultPage />} />
          <Route path="ProductDetailPage" element={<ProductDetailPage />} />
          <Route path="CartPage" element={<CartPage />} />
          <Route path="PaymentPage" element={<PaymentPage />} />
          <Route path="ConfirmPaymentPage" element={<ConfirmPaymentPage />} />
          <Route path="OrderTrackingPage" element={<OrderTrackingPage />} />
        </Route>
        <Route
          path={"*"}
          element={<p className="text-4xl font-medium">Not found</p>}
        />
      </Routes>
    </>
  );
}

export default App;
