const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  images: Object,
  status: { type: String, default: "active" },
  deleted: { type: Boolean, default: false },
});

const Products = mongoose.model("Products", productSchema, "products");

module.exports = Products;
