import "./content.css";
import { ListCategory } from "../component/category/category";
import ContainerContent from "../component/ContainerContent/containerContent";
import Product from "../component/products/products";
import pic from "../assets/Galaxy-A50-Mat-truoc-3.jpg";
import { CategoryBtnInContent } from "../component/category/category";
import { handleClick } from "../component/Act/Act";
import { useState } from "react";

function ContainerHeader({
  bgCategory,
  bgDeal,
  bgBtn,
  title,
  desc,
  category,
  btn,
  deal,
}) {
  return (
    <>
      <p
        className={`${bgCategory} font-medium text-[12px] w-fit p-[0_10px] rounded-2xl`}
      >
        {category}
      </p>
      <p className="font-bold text-xl">{title}</p>
      <p className="text-sm text-gray-700">{desc}</p>
      <div className="flex justify-between">
        <button className={`${bgBtn} font-medium text-[15px]`}>{btn}</button>
        <p className={`${bgDeal} font-bold p-[0_10px] rounded-sm`}>{deal}</p>
      </div>
    </>
  );
}

function Content() {
  let category = {
    "Điện thoại": {
      title: "Điện thoại",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
          <path
            fillRule="evenodd"
            d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const [selectCate, setSelectCate] = useState("Xu hướng tuần này");

  return (
    <>
      <div className="flex mt-13 gap-5">
        <div className="p-8 bgLeftContainer text-white rounded-2xl flex gap-6 w-[65%]">
          <div className="flex gap-9 flex-col w-[60%]">
            <h1 className="font-bold text-3xl">
              Đại Hội Công Nghệ & Điện Tử Thông Minh
            </h1>
            <span className="text-gray-300">
              Trải nghiệm kỷ nguyên số với trợ lý AI phân tích nhu cầu. Giảm
              chạm đỉnh tới 60%, giao nhanh chuẩn xác 24H toàn quốc
            </span>
            <div className="flex items-center gap-4">
              <p className="bg-white text-black p-[8px_16px] rounded-xl text-sm">
                Mã CODE:{" "}
                <strong className="text-[#004AC6] mr-2">NOVATECH25</strong>
                <button className="bg-[#EAEDFF] !text-[#004AC6] p-[2px_6px] rounded-sm text-[12px] font-medium">
                  Copy
                </button>
              </p>
              <p className="text-[14px] font-medium bg-[#457AE3] p-[6px_12px] rounded-xl">
                Giao 24H Miễn Phí Toàn Quốc
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button className="bg-white p-[10px_20px] font-bold !text-[#004AC6] rounded-xl flex items-center gap-2">
                Khám phá ngay
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
              <span className="text-[#EAEDFF] text-[12px]">
                Ưu đãi kết thúc sau 3 ngày
              </span>
            </div>
          </div>
          <div className="flex-1 flex items-end">
            <p className="text-[12px] mb-2 bg-[#ffffff3b] p-[4px_10px] rounded-xl">
              Combo giảm thêm 15% khi ghép đôi thiết bị AI
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div className="bg-white p-5 rounded-xl flex flex-col gap-2 shadow">
            <ContainerHeader
              category={"Thời Trang Cao Cấp"}
              title={"BST Thu Đông Sang Trọng"}
              desc={"Giảm kịch trần đến 50% cho thành viên Nova VIP"}
              btn={"Xem bộ sưu tập >"}
              deal={"-50%"}
              bgCategory={"text-violet-900 bg-violet-200"}
              bgBtn={"!text-violet-700"}
              bgDeal={"bg-[#FFDAD6] text-[#C86D70]"}
            />
          </div>
          <div className="bg-white p-5 rounded-xl flex flex-col gap-2 shadow">
            <ContainerHeader
              category={"Gia Dụng Thông Minh"}
              title={"Tiện Nghi Đột Phá"}
              desc={"Tặng ngay Voucher 300.000đ cho đơn từ 2 triệu"}
              btn={`Lấy voucher ngay `}
              deal={" VOUCHER 300K"}
              bgCategory={"text-violet-900 bg-violet-200"}
              bgBtn={"!text-blue-800"}
              bgDeal={"bg-[#DBE1FF] text-[#00174B]"}
            />
          </div>
        </div>
      </div>
      <ContainerContent>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <div className="w-2 h-6 rounded-2xl bg-[#004AC6]"></div>
            <p className="font-bold text-xl">Khám phá danh mục</p>
          </div>
          <button className="!text-[#004AC6] font-medium text-sm">
            {"Xem tất cả>"}
          </button>
        </div>
        <ul className="flex justify-around">
          <ListCategory
            title={category["Điện thoại"].title}
            icon={category["Điện thoại"].icon}
          />
          <ListCategory
            title={category["Điện thoại"].title}
            icon={category["Điện thoại"].icon}
          />
        </ul>
      </ContainerContent>
      <ContainerContent>
        <div className="flex justify-between bg-[#F2F3FF] p-3 rounded-[9px] items-center">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="size-9 p-2 bg-[#8A4CFC] text-white rounded-[8px]"
            >
              <path d="m10.852 14.772-.383.923" />
              <path d="m10.852 9.228-.383-.923" />
              <path d="m13.148 14.772.382.924" />
              <path d="m13.531 8.305-.383.923" />
              <path d="m14.772 10.852.923-.383" />
              <path d="m14.772 13.148.923.383" />
              <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" />
              <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" />
              <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" />
              <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" />
              <path d="M4.5 10.291A4 4 0 0 0 6 18" />
              <path d="M6.002 5.125a3 3 0 0 0 .4 1.375" />
              <path d="m9.228 10.852-.923-.383" />
              <path d="m9.228 13.148-.923.383" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <div>
              <p className="font-bold text-[17px]">Gợi ý thông minh AI</p>
              <span className="text-[12px] text-[#787983]">
                Phân tích hành vi duyệt gần đây: Danh mục "Tai nghe & Phụ kiện
                cao cấp
              </span>
            </div>
          </div>
          <button>
            {
              <div className="flex gap-1 items-center bg-white p-2 rounded-[8px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3 text-[#8A4CFC]"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[12px]">Làm mới gợi ý</span>
              </div>
            }
          </button>
        </div>
        <div className="flex overflow-auto gap-4">
          <Product
            percen={"-21"}
            pic={pic}
            brand={"Samsung"}
            name={"Điện thoại A50"}
            avergeRating={"4.9"}
            sold={"3.5k"}
            priceSale={"7.690.000"}
            price={"9.700.00"}
            textColorPriceSale='#004AC6'
          />
          <Product
            percen={"-21"}
            pic={pic}
            brand={"Samsung"}
            name={"Điện thoại A50 promax 256gb vỏ titan tự nhiên"}
            avergeRating={"4.9"}
            sold={"3.5k"}
            priceSale={"7.690.000"}
            price={"9.700.00"}
            textColorPriceSale='#004AC6'
          />
          <Product
            percen={"-21"}
            pic={pic}
            brand={"Samsung"}
            name={"Điện thoại A50"}
            avergeRating={"4.9"}
            sold={"3.5k"}
            priceSale={"7.690.000"}
            price={"9.700.00"}
            textColorPriceSale='#004AC6'
          />
        </div>
      </ContainerContent>
      <ContainerContent>
        <div>
          <div>
            <p>Xu hướng & Bán chạy</p>
          </div>
          <div>
            <CategoryBtnInContent
              selectTab={selectCate}
              active={() => handleClick(setSelectCate("Xu hướng tuần này"))}
            >
              Xu hướng tuần này
            </CategoryBtnInContent>
            <CategoryBtnInContent
              selectTab={selectCate}
              active={() => handleClick(setSelectCate("Bán chạy nhất"))}
            >
             Bán chạy nhất
            </CategoryBtnInContent>
            <CategoryBtnInContent
              selectTab={selectCate}
              active={() => handleClick(setSelectCate("Hàng mới về"))}
            >
              Hàng mới về
            </CategoryBtnInContent>
          </div>
        </div>
        <div>
          <Product
            percen={"-21"}
            pic={pic}
            brand={"Samsung"}
            name={"Điện thoại A50"}
            avergeRating={"4.9"}
            sold={"3.5k"}
            priceSale={"7.690.000"}
          />
        </div>
      </ContainerContent>
    </>
  );
}

export default Content;
