const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  images: Object,
});

const Products = mongoose.model("Products", productSchema, "products");

module.exports = Products;
