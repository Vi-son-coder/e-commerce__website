import "./content.css";
import { ListCategory } from "../ComponentTemplates/category/category";
import ContainerContent from "../ComponentTemplates/ContainerContent/containerContent";
import Product from "../ComponentTemplates/products/products";
import pic from "../assets/Galaxy-A50-Mat-truoc-3.jpg";
import BrandContainer from "../ComponentTemplates/brand/brand";
import logo from "../assets/logo-dior.png";
import BottomContentContainer from "../ComponentTemplates/BottomContentContainer/BottomContentContainer";

import TitleOfAIRecomment from "../CustomComponent/TitleContainerContent/TitleOfAIRecomment/TitleOfAIRecomment";
import TitleOfTrendind from "../CustomComponent/TitleContainerContent/TitleOfTrendind/TitleOfTrendind";
import TitleOfBrand from "../CustomComponent/TitleContainerContent/TitleOfBrand/TitleOfBrand";
import TitleOfSuggestion from "../CustomComponent/TitleContainerContent/TitleOfSuggestion/TitleOfSuggestion";
import TitleOfCategory from "../CustomComponent/TitleContainerContent/TitleOfCategory/TitleOfCategory";

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
        <TitleOfCategory />
        <div className="flex overflow-auto gap-20">
          <ListCategory
            title={category["Điện thoại"].title}
            icon={category["Điện thoại"].icon}
          />
          <ListCategory
            title={category["Điện thoại"].title}
            icon={category["Điện thoại"].icon}
          />
        </div>
      </ContainerContent>
      <ContainerContent>
        <TitleOfAIRecomment />
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
            textColorPriceSale="#004AC6"
            textColorPrice="#a4a6b3"
            bgColor="#FAF8FF"
          />
        </div>
      </ContainerContent>
      <ContainerContent>
        <TitleOfTrendind />
        <div className="flex gap-4 overflow-auto ">
          <Product
            percen={"-21"}
            pic={pic}
            brand={"Samsung"}
            name={"Điện thoại A50"}
            avergeRating={"4.9"}
            sold={"3.5k"}
            priceSale={"7.690.000"}
            bgColor="#FAF8FF"
          />
          <Product
            percen={"-21"}
            pic={pic}
            brand={"Samsung"}
            name={"Điện thoại A50"}
            avergeRating={"4.9"}
            sold={"3.5k"}
            priceSale={"7.690.000"}
            bgColor="#FAF8FF"
          />
        </div>
      </ContainerContent>
      <ContainerContent>
        <TitleOfBrand />
        <div className="flex gap-4 overflow-auto ">
          <BrandContainer
            logo={logo}
            name={"Dior"}
            follower={"1,8M"}
            voucher={"Voucher đến 1,5Tr"}
          />
        </div>
      </ContainerContent>
      <div className="w p-5 rounded-2xl mt-7 gap-5 flex flex-col">
        <TitleOfSuggestion />
        <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          <Product
            percen={"-21"}
            pic={pic}
            brand={"Samsung"}
            name={"Điện thoại A50"}
            avergeRating={"4.9"}
            sold={"3.5k"}
            priceSale={"7.690.000"}
            price={"9.700.00"}
            bgColor="white"
            voucher={"Freeship Extra"}
            bgVoucherColor="#6FFBBE"
            textVoucherColor="black"
            textColorPriceSale="#004AC6"
            textColorPrice="#a4a6b3"
          />
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
      <div className="bg-white flex p-5 rounded-2xl justify-between">
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
    </>
  );
}

export default Content;
