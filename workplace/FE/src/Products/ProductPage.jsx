import { useEffect } from "react";
import { useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        // Kiểm tra cấu trúc JSON backend trả về (nếu backend trả về dạng { products: [...] })
        console.log("dữ liệu nhận từ BE:", data.products);
        setProducts(data.products || []);
      });
  }, []);
  return (
    <>
      <ul className="flex">
        {products.map((item) => (
          <li key={item.id}>
            <p>Tiêu đề: {item.title}</p>
            <p>Mô tả: {item.description}</p>
            <p>Danh mục: {item.category}</p>
            <img src={item.images[0]} alt=""/>
          </li>
        ))}
      </ul>
    </>
  );
}
