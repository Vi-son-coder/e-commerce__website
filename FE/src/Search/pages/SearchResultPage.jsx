import Breadcrumb from "../components/Breadcrumb";
import FilterChips from "../components/FilterChips";
import SidebarFilter from "../components/SidebarFilter";
import SortBar from "../components/SortBar";
import Product from "../../ComponentTemplates/products/products";
import { mockProducts } from "../../Data/data";

export default function SearchResultPage() {
  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb />

        <h1 className="text-xl font-bold text-gray-800 my-2">
          Kết quả tìm kiếm cho "bàn phím cơ không dây"
          <span className="text-sm font-normal text-gray-500 ml-2">
            Tìm thấy 1.248 kết quả
          </span>
        </h1>

        <FilterChips />

        <div className="flex space-x-4 mt-4">
          {/* Cột trái: Filter */}
          <SidebarFilter />

          {/* Cột phải: Danh sách sản phẩm */}
          <main className="flex-1">
            <SortBar />

            {/* Product Grid */}
            <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
              {mockProducts.map(({ id, ...product }) => (
                <Product
                  key={id}
                  {...product}
                  bgColor="white"
                  textColorPriceSale="#BA1A1A"
                  textColorPrice="#a4a6b3"
                  textVoucherColor="black"
                  bgVoucherColor="#6FFBBE"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
