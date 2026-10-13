import { useProducts } from "../../hooks/useProducts";

export default function ProductPage() {

  const { products } = useProducts();
  return (
    <>
      <ul>
        {products?.map(({ id, title }) => {
          return <li key={id}>{title}</li>;
        })}
      </ul>
    </>
  );
}
