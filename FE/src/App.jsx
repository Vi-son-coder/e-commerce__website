import "./App.css";
import Content from "./home/content/content";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import SearchResultPage from "./Search/pages/SearchResultPage";
import ProductDetailPage from "./ProductDetailPage/pages/ProductDetailPage";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route Cha chứa Layout chung */}
          <Route path="/" element={<MainLayout />}>
            {/*index: Trang chủ mặc định -> rơi vào vị trí Outlet */}
            <Route index element={<Content />} />
            <Route
              path="Search/pages/SearchResultPage"
              element={<SearchResultPage />}
            />
            <Route path={`ProductDetailPage/pages/ProductDetailPage/:id`} element={<ProductDetailPage/>}/>
            <Route
              path={"*"}
              element={<p className="text-4xl font-medium">Not found</p>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
