import { CategoryBtnInContent } from "../../../ComponentTemplates/category/category";

const SUGGESTED_CATEGORIES = [
  "Tất cả",
  "Điện tử",
  "Thời trang",
  "Làm đẹp",
  "Nhà cửa & Đời sống",
  "Thể thao",
  "Dưới 500k",
];

export default function TitleOfSuggestion({
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xl font-bold">Gợi ý dành riêng cho bạn</p>
        <p className="text-[13px] text-[#73747f]">
          Sản phẩm tuyển chọn dựa trên lịch sử mua sắm và xu hướng thị trường
        </p>
      </div>
      <div className="flex gap-2">
        {SUGGESTED_CATEGORIES.map((category) => (
          <CategoryBtnInContent
            key={category}
            active={() => onCategoryChange(category)}
            selectTab={selectedCategory}
          >
            {category}
          </CategoryBtnInContent>
        ))}
      </div>
    </div>
  );
}