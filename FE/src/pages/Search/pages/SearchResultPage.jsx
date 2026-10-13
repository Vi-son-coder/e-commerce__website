import Breadcrumb from "../components/Breadcrumb";
import FilterChips from "../components/FilterChips";
import SidebarFilter from "../components/SidebarFilter";
import SortBar from "../components/SortBar";
import Product from "../../../components/ComponentTemplates/products/products";
import { useSearch } from "../../../hooks/useSearch";
export default function SearchResultPage() {
  const { result, keyword } = useSearch();
  console.log(result);
  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb />

        <h1 className="text-xl font-bold text-gray-800 my-2">
          {`Kết quả tìm kiếm cho "${keyword}"`}
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
              {result?.map(({ _id, ...p }) => (
                <Product
                  key={_id}
                  id={_id}
                  {...p}
                  bgColor="#FAF8FF"
                  textColorPriceSale="#BA1A1A"
                  sold="1,2k"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
