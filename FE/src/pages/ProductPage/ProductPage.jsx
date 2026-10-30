import { useProducts } from "../../hooks/useProducts";

export default function ProductPage() {

  const { products } = useProducts();
  return (
    <div className="product-list-page">
      <ul>
        {products?.map(({ id, title }) => {
          return <li key={id}>{title}</li>;
        })}
      </ul>
    </div>
  );
}
