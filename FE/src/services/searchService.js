import { request } from "../api/request.api";

export default async function searchProducts(data) {
  const find = data;
  find.status = "active";
  find.deleted = false;
  const products = await request({
    reqPATH: "/products",
    method: "GET",
    data: find,
  });
  return products;
}
export { searchProducts};
