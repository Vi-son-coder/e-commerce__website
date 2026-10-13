import Breadcrumb from "../components/Breadcrumb";
import FilterChips from "../components/FilterChips";
import SidebarFilter from "../components/SidebarFilter";
import SortBar from "../components/SortBar";
import Product from "../../ComponentTemplates/products/products";
import { useSearchParams } from "react-router-dom";
import search from "../../ComponentTemplates/Act/Search";

export default function SearchResultPage() {
  const [searchParams] = useSearchParams()
  const searchKeyword = searchParams.get("searchKeyword");
  const searchProducts = search(searchKeyword);
  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb />

        <h1 className="text-xl font-bold text-gray-800 my-2">
          {`Kết quả tìm kiếm cho "${searchKeyword}"`}
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
              {searchProducts.map(({ id, ...product }) => (
                <Product
                  key={id}
                  {...product}
                  id={id}
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
