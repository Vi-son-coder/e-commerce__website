const mongoose = require("mongoose");
// cú pháp hàm: model('tên_định_danh_model',biến SChema hoặc Object để định nghĩa trường dữ liệu (là 1 contructor), 'tên_collection_muốn_lấy_trong_DB')
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  images: String,
  cart: {
    type: mongoose.Schema.Types.Mixed, // Cho phép chứa toàn bộ object sản phẩm + quantity bên trong
  },
});
const Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;
