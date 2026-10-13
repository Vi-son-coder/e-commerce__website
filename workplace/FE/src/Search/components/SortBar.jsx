import { useState } from "react";
import { handleClick } from "../../ComponentTemplates/Act/Act";
import { CategoryBtnInContent } from "../../ComponentTemplates/category/category";

export default function SortBar() {
  const [selectTab, setSelectTab] = useState("Phổ biến");
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between text-xs mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 font-medium">SẮP XẾP:</span>
        <CategoryBtnInContent
          active={() => handleClick(setSelectTab("Phổ biến"))}
          selectTab={selectTab}
        >
          Phổ biến
        </CategoryBtnInContent>
        <CategoryBtnInContent
          active={() => handleClick(setSelectTab("Mới nhất"))}
          selectTab={selectTab}
        >
          Mới nhất
        </CategoryBtnInContent>
        <CategoryBtnInContent
          active={() => handleClick(setSelectTab("Bán chạy"))}
          selectTab={selectTab}
        >
          Bán chạy
        </CategoryBtnInContent>
      </div>

      <div className="flex items-center space-x-2 text-gray-500">
        <span>1/24</span>
        <button className="p-1 border rounded disabled:opacity-50">&lt;</button>
        <button className="p-1 border rounded">&gt;</button>
      </div>
    </div>
  );
}
