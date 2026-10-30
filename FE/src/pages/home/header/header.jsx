import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pic from "../../../assets/nova-logo-mark.webp.jpg";
import { listCategory } from "../../../data/data";
import { trackAction } from "../../../services/tracking.service";
import { request } from "../../../api/request.api";
import {
  CART_CHANGED_EVENT,
  getProductsInCart,
} from "../../../services/cart.service";
import {
  AUTH_CHANGED_EVENT,
  clearAuthSession,
  getCurrentUser,
} from "../../../services/auth.storage";
import "./header.css";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    function syncCurrentUser() {
      setCurrentUser(getCurrentUser());
    }
    window.addEventListener(AUTH_CHANGED_EVENT, syncCurrentUser);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, syncCurrentUser);
  }, []);

  useEffect(() => {
    let isCurrent = true;

    async function syncCartQuantity() {
      if (!currentUser) {
        setCartItemCount(0);
        return;
      }

      try {
        const products = await getProductsInCart();
        if (isCurrent) {
          setCartItemCount(products.length);
        }
      } catch (error) {
        console.error("Lỗi tải số lượng sản phẩm trong giỏ hàng:", error);
      }
    }

    syncCartQuantity();
    window.addEventListener(CART_CHANGED_EVENT, syncCartQuantity);
    return () => {
      isCurrent = false;
      window.removeEventListener(CART_CHANGED_EVENT, syncCartQuantity);
    };
  }, [currentUser]);

  async function handleLogout() {
    try {
      await request({ reqPATH: "/users/logout", method: "POST" });
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    } finally {
      clearAuthSession();
      navigate("/");
    }
  }

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let accumulatedScroll = 0;
    let scrollDirection = 0;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY;
      previousScrollY = currentScrollY;

      if (currentScrollY <= 0) {
        accumulatedScroll = 0;
        scrollDirection = 0;
        setIsHidden(false);
        return;
      }

      const nextDirection = Math.sign(delta);
      if (nextDirection === 0) return;
      if (nextDirection !== scrollDirection) {
        accumulatedScroll = 0;
        scrollDirection = nextDirection;
      }
      accumulatedScroll += Math.abs(delta);

      if (accumulatedScroll >= 8) {
        setIsHidden(nextDirection > 0);
        accumulatedScroll = 0;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    trackAction("SEARCH", inputValue);
    navigate(`/SearchResultPage?keyword=${encodeURIComponent(inputValue)}`);
  }

  return (
    <header
      className={`market-header${isHidden ? " market-header--hidden" : ""}`}
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="market-topbar">
        <div className="market-shell market-topbar-inner">
          <nav aria-label="Liên kết hỗ trợ" className="market-top-links">
            <a href="#seller">Kênh người bán</a>
            <a href="#app">Tải ứng dụng</a>
            <a href="#social">Kết nối</a>
          </nav>
          <nav aria-label="Tài khoản và trợ giúp" className="market-top-links">
            <Link to="/OrderTrackingPage">Tra cứu đơn hàng</Link>
            <a href="#help">Trợ giúp</a>
            {currentUser ? (
              <>
                <span>Xin chào, {currentUser.firstName}</span>
                <button className="market-logout" onClick={handleLogout} type="button">
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login">Đăng nhập / Đăng ký</Link>
            )}
          </nav>
        </div>
      </div>

      <div className="market-main-header">
        <div className="market-shell market-header-main">
          <Link to="/" className="market-brand" aria-label="NovaMark - Trang chủ">
            <img src={Pic} alt="" />
            <span className="market-brand-copy">
              <strong>NovaMark</strong>
              <small>Mua sắm thông minh</small>
            </span>
          </Link>

          <div className="market-search-area">
            <form className="market-search" onSubmit={handleSearch}>
              <label className="sr-only" htmlFor="market-search-input">
                Tìm kiếm sản phẩm
              </label>
              <input
                id="market-search-input"
                name="search"
                type="search"
                value={inputValue}
                onChange={({ target }) => setInputValue(target.value)}
                placeholder="Tìm sản phẩm, thương hiệu và ưu đãi..."
              />
              <button type="submit" aria-label="Tìm kiếm">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path d="m16 16 5 5" />
                </svg>
                <span>Tìm kiếm</span>
              </button>
            </form>
            <div className="market-search-suggestions" aria-label="Từ khóa phổ biến">
              <Link to="/SearchResultPage?keyword=điện%20thoại">Điện thoại</Link>
              <Link to="/SearchResultPage?keyword=thời%20trang">Thời trang</Link>
              <Link to="/SearchResultPage?keyword=đồ%20gia%20dụng">Đồ gia dụng</Link>
              <Link to="/SearchResultPage?keyword=chăm%20sóc%20da">Chăm sóc da</Link>
            </div>
          </div>

          <Link
            to="/CartPage"
            className="market-cart"
            aria-label={`Giỏ hàng, ${cartItemCount} sản phẩm`}
          >
            <div className="flex items-center gap-0.5">
              <span className="market-cart-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 4h2l2.1 11.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.5L21 8H6" />
                  <circle cx="10" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
                {cartItemCount > 0 && (
                  <span aria-hidden="true">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </span>
              <span>Giỏ hàng</span>
            </div>
          </Link>
        </div>

        <div className="market-category-bar">
          <div className="market-shell market-category-inner">
            <Link to="/products" className="market-all-categories">
              <span aria-hidden="true">☰</span>
              Danh mục
            </Link>
            <nav aria-label="Danh mục sản phẩm" className="market-category-links">
              {listCategory.map((category) => (
                <Link
                  key={category}
                  to={`/SearchResultPage?keyword=${encodeURIComponent(category)}`}
                >
                  {category}
                </Link>
              ))}
            </nav>
            <Link to="/#recommendations" className="market-ai-link">
              Gợi ý dành cho bạn
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
