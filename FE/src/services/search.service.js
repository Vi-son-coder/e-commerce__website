import { request } from "../api/request.api";

export async function searchCategory({ data = null }) {
  const res = await request({ reqPATH: "/products/search", data: data });
  const product = await res.json();
  console.log(product);
  return product;
}
