import { request } from "../api/request.api";
let listCategory = [
  "Tất cả danh mục",
  "Điện tử",
  "Điện thoại",
  "Máy tính & Laptop",
  "Thời trang",
  "Làm đẹp & Sức khỏe",
  "Gia dụng",
  "Thể thao & Dã ngoại",
];

const mockProducts = [
  {
    id: 1,
    discount: 20,
    name: "Bàn Phím Cơ Không Dây Keychron K3...",
    brand: "Keychron",
    priceSale: "2.190.000",
    price: "2.750.000",
    avergeRating: 4.9,
    sold: "1.2k",

    voucher: "Freeship Xtra toàn quốc",
  },
  {
    id: 2,
    discount: 20,
    name: "Điện thoại Keychron K3...",
    brand: "Keychron",
    priceSale: "2.190.000",
    price: "2.750.000",
    avergeRating: 4.9,
    sold: "1.2k",
    voucher: "Freeship Xtra toàn quốc",
  },
];

const user = { username: "emilys", password: "emilyspass" };
async function getUser() {
  let User = (await request({ reqPATH: "/users", data: user }).then((res) =>
    res.json(),
  )) || [{ _id: "defaultUserId" }];
  localStorage.setItem("userId", JSON.stringify(User[0]._id));
  return User;
}
export { listCategory, mockProducts, getUser };
