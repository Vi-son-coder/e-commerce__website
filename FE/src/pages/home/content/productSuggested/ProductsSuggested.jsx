import Product from "../../../../components/ComponentTemplates/products/products";
import { useProducts } from "../../../../hooks/useProducts";

export default function ProductsSuggested() {
  const data = {
    limit: 21,
  };
  const { products } = useProducts(data);

  return (
    <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
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
