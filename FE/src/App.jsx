import "./App.css";
import Content from "./pages/home/content/content";

import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import SearchResultPage from "./pages/Search/pages/SearchResultPage";
import ProductDetailPage from "./pages/ProductDetailPage/pages/ProductDetailPage";
import CartPage from "./pages/ShoppingCart/pages/CartPage";
import ConfirmPaymentPage from "./pages/ConfirmPayment/pages/ConfirmPaymentPage";
import OrderTrackingPage from "./pages/OrderTracking/page/OrderTrackingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsSuggested from "./pages/home/content/productSuggested/ProductsSuggested";
import CatgoryFilter from "./pages/home/content/category/CategoryFilter";
function App() {
  return (
    <>
      <Routes>
        {/* Route Cha chứa Layout chung */}
        <Route path="/" element={<MainLayout />}>
          {/*index: Trang chủ mặc định -> rơi vào vị trí Outlet */}
          <Route path="/" element={<Content />}>
            <Route index element={<ProductsSuggested />} />
            <Route
              path="category"
              element={<CatgoryFilter/>}
            />
          </Route>

          <Route path="SearchResultPage" element={<SearchResultPage />} />
          <Route path="ProductDetailPage" element={<ProductDetailPage />} />
          <Route path="CartPage/*" element={<CartPage />} />
          <Route path="ConfirmPaymentPage" element={<ConfirmPaymentPage />} />
          <Route path="OrderTrackingPage" element={<OrderTrackingPage />} />
          <Route path="products" element={<ProductPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
