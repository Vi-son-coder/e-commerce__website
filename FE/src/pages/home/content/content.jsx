import "./content.css";
import ContainerContent from "../../../components/ComponentTemplates/ContainerContent/containerContent";
import Product from "../../../components/ComponentTemplates/products/products";
import BrandContainer from "../../../components/ComponentTemplates/brand/brand";
import BottomContentContainer from "../../../components/ComponentTemplates/BottomContentContainer/BottomContentContainer";
import logo from "../../../assets/logo-dior.png";
import TitleOfAIRecomment from "../../../components/CustomComponent/TitleContainerContent/TitleOfAIRecomment/TitleOfAIRecomment";
import TitleOfTrendind from "../../../components/CustomComponent/TitleContainerContent/TitleOfTrendind/TitleOfTrendind";
import TitleOfSuggestion from "../../../components/CustomComponent/TitleContainerContent/TitleOfSuggestion/TitleOfSuggestion";
import { useProducts } from "../../../hooks/useProducts";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { request } from "../../../api/request.api";

const HERO_BANNERS = [
  {
    title: "Ngày hội mua sắm — ưu đãi đến 50%",
    subtitle: "Khám phá sản phẩm được tuyển chọn, giao nhanh tận nhà.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&auto=format&fit=crop&q=85",
    label: "ƯU ĐÃI MỖI NGÀY",
  },
  {
    title: "Làm mới phong cách của bạn",
    subtitle: "Khám phá bộ sưu tập thời trang đang được yêu thích.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&auto=format&fit=crop&q=85",
    label: "BỘ SƯU TẬP MỚI",
  },
  {
    title: "Công nghệ hay, giá thật tốt",
    subtitle: "Tìm món đồ công nghệ phù hợp từ các gian hàng uy tín.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=85",
    label: "GỢI Ý THÔNG MINH",
  },
];

function Content() {
  const productsAIRcm = useProducts({ limit: 7 });
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [aiStatus, setAiStatus] = useState("loading");
  const [recommendationRefresh, setRecommendationRefresh] = useState(0);
  const [activeBanner, setActiveBanner] = useState(0);
  const [saleSeconds, setSaleSeconds] = useState(2 * 60 * 60 + 15 * 60 + 43);
  const [canScrollCategoriesLeft, setCanScrollCategoriesLeft] = useState(false);
  const [canScrollCategoriesRight, setCanScrollCategoriesRight] = useState(false);
  const [canScrollFlashLeft, setCanScrollFlashLeft] = useState(false);
  const [canScrollFlashRight, setCanScrollFlashRight] = useState(false);
  const flashGridRef = useRef(null);
  const saleProducts = productsAIRcm.products || [];

  const visualCategories = [
    {
      key: "mens-shirts",
      title: "Thời Trang Nam",
      image: "photo-1521572163474-6864f9cf17ab",
    },
    {
      key: "smartphones",
      title: "Điện Thoại & Phụ Kiện",
      image: "photo-1511707171634-5f897ff02aa9",
    },
    {
      key: "televisions",
      title: "Thiết Bị Điện Tử",
      image: "photo-1593359677879-a4bb92f829d1",
    },
    {
      key: "laptops",
      title: "Máy Tính & Laptop",
      image: "photo-1496181133206-80ce9b88a853",
    },
    {
      key: "cameras",
      title: "Máy Ảnh & Máy Quay Phim",
      image: "photo-1516035069371-29a1b244cc32",
    },
    {
      key: "mens-watches",
      title: "Đồng Hồ",
      image: "photo-1523275335684-37898b6baf30",
    },
    {
      key: "mens-shoes",
      title: "Giày Dép Nam",
      image: "photo-1542291026-7eec264c27ff",
    },
    {
      key: "kitchen-appliances",
      title: "Thiết Bị Điện Gia Dụng",
      image: "photo-1570197788417-0e82375c9371",
    },
    {
      key: "sports",
      title: "Thể Thao & Du Lịch",
      image: "photo-1574629810360-7efbbe195018",
    },
    {
      key: "motorcycles",
      title: "Ô Tô & Xe Máy & Xe Đạp",
      image: "photo-1558981806-ec527fa84c39",
    },
    {
      key: "womens-dresses",
      title: "Thời Trang Nữ",
      image: "photo-1595777457583-95e059d581b8",
    },
    {
      key: "baby",
      title: "Mẹ & Bé",
      image: "photo-1503919005314-30d93d07d823",
    },
    {
      key: "home",
      title: "Nhà Cửa & Đời Sống",
      image: "photo-1584990347449-a1e3e8953f88",
    },
    {
      key: "beauty",
      title: "Sắc Đẹp",
      image: "photo-1596462502278-27bfdc403348",
    },
    {
      key: "health",
      title: "Sức Khỏe",
      image: "photo-1584308666744-24d5c474f2ae",
    },
    {
      key: "womens-shoes",
      title: "Giày Dép Nữ",
      image: "photo-1543163521-1bf539c55dd2",
    },
    {
      key: "womens-bags",
      title: "Túi Ví Nữ",
      image: "photo-1584917865442-de89df76afd3",
    },
    {
      key: "fashion-accessories",
      title: "Phụ Kiện & Trang Sức",
      image: "photo-1624222247344-550fb8f14f8f",
    },
    {
      key: "groceries",
      title: "Bách Hóa Online",
      image: "photo-1548907040-4d1d98f4aee7",
    },
    {
      key: "books",
      title: "Nhà Sách Online",
      image: "photo-1544947950-fa07a98d237f",
    },
  ];
  const categoryGridRef = useRef(null);

  useEffect(() => {
    function updateScrollButtons(element, setCanScrollLeft, setCanScrollRight) {
      if (!element) return;

      setCanScrollLeft(element.scrollLeft > 1);
      setCanScrollRight(
        element.scrollWidth - element.clientWidth - element.scrollLeft > 1,
      );
    }

    const scrollAreas = [
      {
        element: categoryGridRef.current,
        setCanScrollLeft: setCanScrollCategoriesLeft,
        setCanScrollRight: setCanScrollCategoriesRight,
      },
      {
        element: flashGridRef.current,
        setCanScrollLeft: setCanScrollFlashLeft,
        setCanScrollRight: setCanScrollFlashRight,
      },
    ].filter(({ element }) => element);

    function updateAllScrollButtons() {
      scrollAreas.forEach(
        ({ element, setCanScrollLeft, setCanScrollRight }) => {
          updateScrollButtons(element, setCanScrollLeft, setCanScrollRight);
        },
      );
    }

    scrollAreas.forEach(({ element }) => {
      element.addEventListener("scroll", updateAllScrollButtons, {
        passive: true,
      });
    });
    window.addEventListener("resize", updateAllScrollButtons);
    updateAllScrollButtons();

    return () => {
      scrollAreas.forEach(({ element }) => {
        element.removeEventListener("scroll", updateAllScrollButtons);
      });
      window.removeEventListener("resize", updateAllScrollButtons);
    };
  }, [saleProducts.length]);

  useEffect(() => {
    const bannerInterval = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => window.clearInterval(bannerInterval);
  }, []);

  useEffect(() => {
    const saleInterval = window.setInterval(() => {
      setSaleSeconds((seconds) =>
        seconds > 0 ? seconds - 1 : 2 * 60 * 60 + 15 * 60 + 43,
      );
    }, 1000);
    return () => window.clearInterval(saleInterval);
  }, []);

  useEffect(() => {
    let isActive = true;

    async function getAiRecommendations() {
      setAiStatus("loading");

      try {
        const response = await request({
          reqPATH: "/products/recommendations/home?limit=7",
        });
        if (!response?.ok) {
          throw new Error("Không thể tải gợi ý AI");
        }

        const data = await response.json();
        if (!isActive) return;

        const recommendations = Array.isArray(data.recommendations)
          ? data.recommendations
          : [];
        setAiRecommendations(recommendations);
        setAiStatus(recommendations.length ? "ready" : "empty");
      } catch (error) {
        if (!isActive) return;
        console.error("Lỗi tải gợi ý AI trên trang chủ:", error);
        setAiStatus("error");
      }
    }

    getAiRecommendations();
    return () => {
      isActive = false;
    };
  }, [recommendationRefresh]);

  const categorySectionRef = useRef(null);
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const hasQuerry = search.get("category");
  useEffect(() => {
    if (categorySectionRef.current && hasQuerry) {
      categorySectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [hasQuerry]);
  return (
    <>
      <div className="market-home">
        <section className="market-showcase">
          <div className="market-banner-layout">
            <div
              className="market-hero-banner"
              style={{
                backgroundImage: `url("${HERO_BANNERS[activeBanner].image}")`,
              }}
            >
              <div className="market-hero-shade">
                <span className="market-kicker">
                  {HERO_BANNERS[activeBanner].label}
                </span>
                <h1>{HERO_BANNERS[activeBanner].title}</h1>
                <p>{HERO_BANNERS[activeBanner].subtitle}</p>
                <Link to="/products" className="market-banner-cta">
                  Khám phá ngay <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="market-banner-dots" aria-label="Chọn banner">
                {HERO_BANNERS.map((banner, index) => (
                  <button
                    key={banner.label}
                    type="button"
                    aria-label={`Xem banner ${index + 1}`}
                    aria-pressed={activeBanner === index}
                    className={activeBanner === index ? "is-active" : ""}
                    onClick={() => setActiveBanner(index)}
                  />
                ))}
              </div>
            </div>
            <div className="market-promo-stack">
              <Link
                to="/SearchResultPage?keyword=th%E1%BB%9Di%20trang"
                className="market-promo-tile market-promo-fashion"
              >
                <span>THỜI TRANG MỚI</span>
                <strong>Mặc đẹp mỗi ngày</strong>
                <small>Khám phá bộ sưu tập →</small>
              </Link>
              <Link
                to="/SearchResultPage?keyword=c%C3%B4ng%20ngh%E1%BB%87"
                className="market-promo-tile market-promo-tech"
              >
                <span>GIAN HÀNG CÔNG NGHỆ</span>
                <strong>Nâng cấp trải nghiệm</strong>
                <small>Ưu đãi đang chờ bạn →</small>
              </Link>
            </div>
          </div>
        </section>

        <section className="market-section market-category-section">
          <div className="market-category-heading">
            <h2>DANH MỤC</h2>
          </div>
          <div className="market-category-grid-wrap">
            <div
              className="market-quick-categories"
              ref={categoryGridRef}
              aria-label="Danh mục sản phẩm"
            >
              {visualCategories.map((item) => (
                <Link
                  key={item.key}
                  to={`/category?category=${item.key}`}
                  aria-label={item.title}
                >
                  <span className="market-category-image">
                    <img
                      src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=160&h=160&q=80`}
                      alt=""
                      loading="lazy"
                    />
                  </span>
                  <span className="market-category-label">{item.title}</span>
                </Link>
              ))}
            </div>
            {canScrollCategoriesLeft && (
              <button
                type="button"
                className="market-category-arrow market-category-prev"
                aria-label="Xem danh mục trước"
                onClick={() =>
                  categoryGridRef.current?.scrollBy({
                    left: -categoryGridRef.current.clientWidth * 0.8,
                    behavior: "smooth",
                  })
                }
              >
                <span aria-hidden="true">‹</span>
              </button>
            )}
            {canScrollCategoriesRight && (
              <button
                type="button"
                className="market-category-arrow market-category-next"
                aria-label="Xem thêm danh mục"
                onClick={() =>
                  categoryGridRef.current?.scrollBy({
                    left: categoryGridRef.current.clientWidth * 0.8,
                    behavior: "smooth",
                  })
                }
              >
                <span aria-hidden="true">›</span>
              </button>
            )}
          </div>
        </section>

        <section
          id="flash-deals"
          className="market-section market-flash-section"
        >
          <div className="market-section-heading market-flash-heading">
            <div className="market-flash-title">
              <span aria-hidden="true">⚡</span>
              <h2>FLASH SALE</h2>
              <span>ƯU ĐÃI CÓ HẠN</span>
            </div>
            <div
              className="market-sale-timer"
              aria-label="Thời gian ưu đãi còn lại"
            >
              <span>
                {String(Math.floor(saleSeconds / 3600)).padStart(2, "0")}
              </span>
              <b>:</b>
              <span>
                {String(Math.floor((saleSeconds % 3600) / 60)).padStart(2, "0")}
              </span>
              <b>:</b>
              <span>{String(saleSeconds % 60).padStart(2, "0")}</span>
            </div>
            <Link to="/products" className="market-section-link">
              Xem tất cả <span aria-hidden="true">›</span>
            </Link>
          </div>
          {saleProducts.length ? (
            <div className="market-flash-carousel">
              <div className="market-flash-grid" ref={flashGridRef}>
                {saleProducts.slice(0, 7).map(({ _id, ...product }) => (
                  <Product
                    key={_id}
                    id={_id}
                    {...product}
                    bgColor="#ffffff"
                    textColorPriceSale="#f53d2d"
                    sold="1,2k"
                    isFlashSale
                  />
                ))}
              </div>
              {canScrollFlashLeft && (
                <button
                  type="button"
                  className="market-flash-arrow market-flash-prev"
                  aria-label="Xem sản phẩm Flash Sale trước"
                  onClick={() =>
                    flashGridRef.current?.scrollBy({
                      left: -flashGridRef.current.clientWidth * 0.8,
                      behavior: "smooth",
                    })
                  }
                >
                  <span aria-hidden="true">‹</span>
                </button>
              )}
              {canScrollFlashRight && (
                <button
                  type="button"
                  className="market-flash-arrow market-flash-next"
                  aria-label="Xem sản phẩm Flash Sale tiếp theo"
                  onClick={() =>
                    flashGridRef.current?.scrollBy({
                      left: flashGridRef.current.clientWidth * 0.8,
                      behavior: "smooth",
                    })
                  }
                >
                  <span aria-hidden="true">›</span>
                </button>
              )}
            </div>
          ) : (
            <div className="market-empty-products">
              Ưu đãi mới đang được cập nhật. Mời bạn quay lại sau.
            </div>
          )}
        </section>

        <section
          id="featured-shops"
          className="market-section market-mall-section"
        >
          <div className="market-section-heading market-mall-heading">
            <div className="market-mall-title">
              <strong>NOVAMARK MALL</strong>
              <span>Gian hàng chính hãng</span>
            </div>
            <div className="market-mall-benefits">
              <span>↻ 7 ngày đổi trả</span>
              <span>✓ Cam kết chính hãng</span>
              <span>♧ Ưu đãi vận chuyển</span>
            </div>
            <Link to="/products" className="market-section-link">
              Xem tất cả <span aria-hidden="true">›</span>
            </Link>
          </div>
          <div className="market-mall-grid">
            <BrandContainer
              logo={logo}
              name={"Dior"}
              follower={"1,8M"}
              voucher={"Voucher đến 1,5Tr"}
            />
            <div className="market-mall-promo">
              <span>CHỌN LỌC BỞI NOVAMARK</span>
              <strong>Thương hiệu bạn yêu thích</strong>
              <p>Ưu đãi riêng, sản phẩm chính hãng, giao hàng an tâm.</p>
              <Link to="/SearchResultPage?keyword=th%C6%B0%C6%A1ng%20hi%E1%BB%87u">
                Khám phá gian hàng <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
        <ContainerContent>
          <TitleOfAIRecomment
            isRefreshing={aiStatus === "loading"}
            onRefresh={() => setRecommendationRefresh((value) => value + 1)}
          />
          <div className=" flex gap-4 overflow-auto ">
            {aiRecommendations.map(({ _id, ...p }) => {
              return (
                <Product
                  key={_id}
                  id={_id}
                  {...p}
                  bgColor="#FAF8FF"
                  textColorPriceSale="#BA1A1A"
                  sold="1,2k"
                />
              );
            })}
            {aiStatus === "loading" && (
              <p className="py-8 text-sm text-gray-500">Đang tải gợi ý AI...</p>
            )}
            {aiStatus === "empty" && (
              <p className="py-8 text-sm text-gray-500">
                Chưa có sản phẩm phù hợp để gợi ý.
              </p>
            )}
            {aiStatus === "error" && (
              <p className="py-8 text-sm text-red-700">
                Không tải được gợi ý AI. Hãy thử làm mới.
              </p>
            )}
          </div>
        </ContainerContent>
        <ContainerContent>
          <TitleOfTrendind />
          <div className="flex gap-4 overflow-auto ">
            {productsAIRcm.products?.map(({ _id, ...p }) => {
              return (
                <Product
                  key={_id}
                  id={_id}
                  {...p}
                  bgColor="#FAF8FF"
                  textColorPriceSale="#BA1A1A"
                  sold="1,2k"
                />
              );
            })}
          </div>
        </ContainerContent>
        <div
          id="recommendations"
          className="market-suggestion-section p-5 rounded-2xl mt-7 gap-5 flex flex-col"
        >
          <TitleOfSuggestion />
          <div ref={categorySectionRef}>
            <Outlet />
          </div>
          <div className="flex justify-center ">
            <div className=" flex items-center gap-2 bg-white p-[10px_40px] rounded-[7px]">
              <button className="cursor-pointer text-[15px] font-bold !text-[#004AC6]">
                Xem thêm sản phẩm gợi ý
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-3 text-[#004AC6]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="market-service-strip bg-white flex p-5 rounded-2xl justify-between">
          <BottomContentContainer
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            }
            iconColor="#004AC6"
            iconBgColor="#DBE1FF"
            title={"100% Chính hãng"}
            desc={"Cam kết bồi hoàn 200% nếu phát hiện giả"}
          />
          <BottomContentContainer
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
            }
            iconColor="#006242"
            iconBgColor="#6FFBBE"
            title={"Giao Hỏa Tốc 2H"}
            desc={"Áp dụng nội thành Hà Nội & TP.HCM"}
          />
          <BottomContentContainer
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            }
            iconColor="#712AE2"
            iconBgColor="#EADDFF"
            title={"Đổi trả 30 Ngày"}
            desc={"Thủ tục nhanh chóng ngay tại nhà"}
          />
          <BottomContentContainer
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                stroke-linecap="round"
                stroke-linejoin="round"
                className="size-6"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            }
            iconColor="#131B2E"
            iconBgColor="#E2E7FF"
            title={"Hỗ Trợ 24/7 AI & CSKH"}
            desc={"Tư vấn thông minh & chuyên viên tận tâm"}
          />
        </div>
      </div>
    </>
  );
}

export default Content;
