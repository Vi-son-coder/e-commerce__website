import { useState } from "react";
import { handleClick } from "../../../ComponentTemplates/Act/Act";

import { CategoryBtnInContent } from "../../../ComponentTemplates/category/category";


export default function TitleOfSuggestion(){
     const [selectCateSuggest, setSelectCateSuggest] = useState("Tất cả");
    return(
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold">Gợi ý dành riêng cho bạn</p>
            <p className="text-[13px] text-[#73747f]">
              Sản phẩm tuyển chọn dựa trên lịch sử mua sắm và xu hướng thị
              trường
            </p>
          </div>
          <div className="flex gap-2">
            <CategoryBtnInContent
              active={() => handleClick(setSelectCateSuggest("Tất cả"))}
              selectTab={selectCateSuggest}
            >
              Tất cả
            </CategoryBtnInContent>
            <CategoryBtnInContent
              active={() => handleClick(setSelectCateSuggest("Điện tử"))}
              selectTab={selectCateSuggest}
            >
              Điện tử
            </CategoryBtnInContent>
            <CategoryBtnInContent
              active={() => handleClick(setSelectCateSuggest("Thời trang"))}
              selectTab={selectCateSuggest}
            >
              Thời trang
            </CategoryBtnInContent>
            <CategoryBtnInContent
              active={() => handleClick(setSelectCateSuggest("Làm đẹp"))}
              selectTab={selectCateSuggest}
            >
              Làm đẹp
            </CategoryBtnInContent>
            <CategoryBtnInContent
              active={() =>
                handleClick(setSelectCateSuggest("Nhà cửa & Đời sống"))
              }
              selectTab={selectCateSuggest}
            >
              Nhà cửa & Đời sống
            </CategoryBtnInContent>
            <CategoryBtnInContent
              active={() => handleClick(setSelectCateSuggest("Thể thao"))}
              selectTab={selectCateSuggest}
            >
              Thể thao
            </CategoryBtnInContent>
            <CategoryBtnInContent
              active={() => handleClick(setSelectCateSuggest("Dưới 500k"))}
              selectTab={selectCateSuggest}
            >
              Dưới 500k
            </CategoryBtnInContent>
          </div>
        </div>
    )
}