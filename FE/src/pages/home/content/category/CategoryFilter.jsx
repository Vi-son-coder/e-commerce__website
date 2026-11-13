import { useLocation } from "react-router-dom";
import Product from "../../../../components/ComponentTemplates/products/products";
import { searchCategory } from "../../../../services/search.service";
import { useEffect, useState } from "react";
import { trackAction } from "../../../../services/tracking.service";

export default function CatgoryFilter() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const category = search.get("category");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      let searchProducts = await searchCategory({
        data: { category: category },
      });
      setProducts(searchProducts);
      trackAction('CLICK_CATEGORY',category);
    }
    getProducts();
  }, [category]);
  console.log(products);
  return (
    <div className="product-list-page gap-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
      {products?.map(({ _id, ...p }) => {
        return (
          <Product
            key={_id}
            id={_id}
            {...p}
            bgColor="#FAF8FF"
            textColorPriceSale="#BA1A1A"
            sold="1.2k"
          />
        );
      })}
    </div>
  );
}
