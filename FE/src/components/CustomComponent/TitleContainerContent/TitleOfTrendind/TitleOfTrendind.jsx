
import { useState } from "react";
import { CategoryBtnInContent } from "../../../ComponentTemplates/category/category";
import { handleClick } from "../../../ComponentTemplates/Act/Act";

function TitleOfTrendind() {
  const [selectCateTrend, setSelectCateTrend] = useState("Xu hướng tuần này");
  return (
    <div className="flex items-center justify-between pb-5 border-b-1 border-[#F2F3FF]">
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5 text-[#004AC6]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
        <p className="font-bold text-[17px]">Xu hướng & Bán Chạy</p>
      </div>
      <div className="flex gap-2">
        <CategoryBtnInContent
          active={() => handleClick(setSelectCateTrend("Xu hướng tuần này"))}
          selectTab={selectCateTrend}
        >
          Xu hướng tuần này
        </CategoryBtnInContent>
        <CategoryBtnInContent
          active={() => handleClick(setSelectCateTrend("Bán chạy nhất"))}
          selectTab={selectCateTrend}
        >
          Bán chạy nhất
        </CategoryBtnInContent>
        <CategoryBtnInContent
          active={() => handleClick(setSelectCateTrend("Hàng mới về"))}
          selectTab={selectCateTrend}
        >
          Hàng mới về
        </CategoryBtnInContent>
      </div>
    </div>
  );
}

export default TitleOfTrendind;
