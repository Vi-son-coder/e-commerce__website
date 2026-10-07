import {ListOnHeader} from "../component/category/category";
import Pic from "../assets/nova-logo-mark.webp.jpg";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useShop } from "../context/ShopContext";
import { navigate } from "../lib/useRoute";
import { formatVND } from "../lib/format";

function TopBar({ children, onClick }) {
  return (
    <>
      <li>
        <button className="cursor-pointer" onClick={onClick}>{children}</button>
      </li>
    </>
  );
}

// Cuộn tới khu vực danh sách sản phẩm sau khi lọc/tìm kiếm
const scrollToProducts = () =>
  setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 80);

function Header() {
  const { user, logout, openAuth } = useAuth();
  const cart = useCart();
  const { categories, filters, setFilters } = useShop();

  const ALL = "Tất cả danh mục";
  // Danh mục lấy từ backend (GET /categories)
  const listCategory = [ALL, ...categories.map((c) => c.category_name)];
  const selectTab = categories.find((c) => c.category_id === filters.categoryId)?.category_name ?? ALL;

  const [searchText, setSearchText] = useState("");
  const [searchCat, setSearchCat] = useState("");

  function handleClick(category) {
    const found = categories.find((c) => c.category_name === category);
    setFilters({ categoryId: found ? found.category_id : null, q: "" });
    setSearchText("");
    setSearchCat(found ? String(found.category_id) : "");
    navigate("/");
    scrollToProducts();
  }

  function handleSearch(e) {
    e.preventDefault();
    setFilters({ categoryId: searchCat ? Number(searchCat) : null, q: searchText.trim() });
    navigate("/");
    scrollToProducts();
  }
  return (
    <>
      <div className="flex p-[6px_80px_6px_80px] justify-between bg-[#F2F3FF]">
        <ul className="flex gap-5">
          <TopBar>Kênh người bán</TopBar>
          <TopBar>Tải ứng dụng</TopBar>
          <TopBar>Kết nối với chúng tôi</TopBar>
        </ul>
        <ul className="flex gap-5">
          <TopBar>Trợ giúp & CSKH</TopBar>
          <TopBar onClick={() => (user ? navigate("/orders") : openAuth("login"))}>Tra cứu đơn hàng</TopBar>
          <TopBar>Thông báo</TopBar>
          <p className="flex whitespace-pre">
            <TopBar>VN</TopBar> / <TopBar>VND</TopBar>
          </p>
          {user ? (
            <p className="flex whitespace-pre">
              <TopBar onClick={() => navigate("/orders")}>{user.full_name || user.username}</TopBar> /{" "}
              <TopBar onClick={logout}>Đăng xuất</TopBar>
            </p>
          ) : (
            <p className="flex whitespace-pre">
              <TopBar onClick={() => openAuth("login")}>Đăng nhập</TopBar> / <TopBar onClick={() => openAuth("register")}>Đăng ký</TopBar>
            </p>
          )}
        </ul>
      </div>
      <div className="!bg-white shadow">
        <div className="flex p-[20px_80px] justify-between">
          <div className="flex gap-3 items-center mr-20 cursor-pointer" onClick={() => navigate("/")}>
            <img src={Pic} alt="" className="size-11 rounded-xl" />
            <div>
              <p className="text-2xl font-bold text-blue-700">NovaMark</p>
              <p className="text-sm text-gray-800">Sàn Thương Mại Thông Minh</p>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex-1 mr-10 flex bg-[#F2F3FF] p-[4px_8px] rounded-xl">
            <div className="flex items-center w-full">
              <select name="" id="" className="bg-white p-2 rounded-xl mr-2" value={searchCat} onChange={(e) => setSearchCat(e.target.value)}>
                <option value="">Tất cả danh mục</option>
                {categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
                ))}
              </select>
              <div className="flex items-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
  
                <input
                  type="text"
                  placeholder="Tìm kiếm điện tử, thương hiệu, hoặc deal công nghệ cao cấp"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="p-3 focus:outline-none w-full"
                />
              </div>
              <button type="submit" className="rounded-sm bg-blue-500 !text-white p-[7px_15px] text-sm cursor-pointer">
                Tìm
              </button>
            </div>
          </form>
          <div className="flex">
            <div className="flex border-r pr-4 mr-4">
              <div className="flex gap-5 items-center">
                <div className="flex gap-1">
                  <div className="relative flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </div>
                  <p>Yêu thích</p>
                </div>
                <div className="flex gap-2 items-center bg-[#F2F3FF] p-[4px_16px] rounded-xl cursor-pointer" onClick={() => navigate("/cart")}>
                  <div className="flex relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 text-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    {cart.count > 0 && (
                      <p className="bg-violet-400 absolute text-white min-w-[15px] text-center text-[8px] p-[1px_3px] rounded-[50px] top-[-20%] left-[50%]">
                        {cart.count}
                      </p>
                    )}
                  </div>
  
                  <div>
                    <p className="text-gray-700">Giỏ hàng</p>
                    <strong>{formatVND(cart.total)}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="rounded-[50%] border w-10 h-10">
                <img src="" alt="" />
              </div>
              <div>
                <strong className="text-sm">{user ? user.full_name || user.username : "Khách"}</strong>
                <p className="text-[12px]">{user ? user.email : "Chưa đăng nhập"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center p-[20px_80px] justify-between">
          <ul className="flex gap-7 ">
            {listCategory.map((category) => (
              <li key={category}>
                {" "}
                <ListOnHeader
                  selectTab={selectTab}
                  active={() => handleClick(category)}
                >
                  {category}
                </ListOnHeader>
              </li>
            ))}
          </ul>
          <ul className="flex gap-7">
            <li>
              <button className="!text-red-500  cursor-pointer text-sm font-medium">
                Deal chớp nhoáng
              </button>
            </li>
            <li>
              <button
                className="!text-violet-500  cursor-pointer text-sm font-medium"
                onClick={() => {
                  navigate("/");
                  setTimeout(() => document.getElementById("ai-recs")?.scrollIntoView({ behavior: "smooth" }), 80);
                }}
              >
                Gợi ý AI
              </button>
            </li>
            <li>
              <button className="!text-green-600  cursor-pointer text-sm font-medium">
                Mã giảm giá
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
