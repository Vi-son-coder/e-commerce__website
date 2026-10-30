const Products = require("../../models/client/product.model");
const axios = require("axios");
// xử lý logic bên file controller ví dụ tính toán giá tiền sau khi giảm giá
module.exports.index = async (req, res) => {
  const limit = req.query.limit;
  const find = {
    status: "active",
    deleted: false,
  };

  if (limit) {
    const products = await Products.find(find).limit(limit);
    res.json(products);
  } else {
    const products = await Products.find(find);
    res.json(products);
  }
};

module.exports.getHomeRecommendations = async (req, res) => {
  const requestedLimit = Number.parseInt(req.query.limit, 10);
  const limit = Number.isNaN(requestedLimit)
    ? 7
    : Math.min(Math.max(requestedLimit, 1), 20);

  try {
    const pythonResponse = await axios.get(
      "http://localhost:8000/recommendations/home",
      { params: { limit } },
    );
    return res.status(200).json(pythonResponse.data);
  } catch (error) {
    console.error("Lỗi tải gợi ý trang chủ từ AI:", error.message);
    return res.status(500).json({
      success: false,
      message: "Không thể tải gợi ý AI",
      recommendations: [],
    });
  }
};

module.exports.getFrequentlyBoughtTogether = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log(req);

    // Gọi thẳng vào cổng 8000 của Python FastAPI mà bạn vừa test ở trên
    const pythonResponse = await axios.get(
      `http://localhost:8000/recommendations/bought-together/${productId}`,
    );

    // Trả kết quả nhận được từ Python về cho Frontend (React)
    return res.status(200).json(pythonResponse.data);
  } catch (error) {
    console.error("Lỗi kết nối từ Node.js sang Python AI:", error.message);
    return res.status(500).json({
      success: false,
      message: "Không thể kết nối tới AI Service",
      recommendations: [],
    });
  }
};

module.exports.edit = (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      status,
      images,
      deleted,
    } = req.body;
  } catch (error) {
    res.status(500).json(error);
  }
  res.send("edit sản phẩm");
};

module.exports.search = async (req, res) => {
  const find = {
    status: "active",
    deleted: false,
  };

  const keyword = String(req.query.keyword || "").trim();
  if (keyword) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const keywordPattern = new RegExp(escapedKeyword, "i");
    find.$or = [
      { title: keywordPattern },
      { brand: keywordPattern },
      { category: keywordPattern },
    ];
  }
  if (req.query.id) {
    find._id = req.query.id;
  }

  const brand = String(req.query.brand || "").trim();
  if (brand) {
    const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    find.brand = new RegExp(escapedBrand, "i");
  }

  if (req.query.category) find.category = req.query.category;

  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);
  const minRating = Number(req.query.minRating);
  const minDiscount = Number(req.query.minDiscount);
  const price = {};

  if (
    req.query.minPrice !== undefined &&
    Number.isFinite(minPrice) &&
    minPrice >= 0
  ) {
    price.$gte = minPrice;
  }
  if (
    req.query.maxPrice !== undefined &&
    Number.isFinite(maxPrice) &&
    maxPrice >= 0
  ) {
    price.$lte = maxPrice;
  }
  if (Object.keys(price).length) find.price = price;
  if (
    req.query.minRating !== undefined &&
    Number.isFinite(minRating) &&
    minRating >= 0 &&
    minRating <= 5
  ) {
    find.rating = { $gte: minRating };
  }
  if (
    req.query.minDiscount !== undefined &&
    Number.isFinite(minDiscount) &&
    minDiscount >= 0 &&
    minDiscount <= 100
  ) {
    find.discountPercentage = { $gte: minDiscount };
  }

  try {
    const products = await Products.find(find);
    return res.json(products);
  } catch (error) {
    console.error("Lỗi tìm kiếm sản phẩm:", error.message);
    return res.status(500).json({ message: "Không thể tìm kiếm sản phẩm" });
  }
};
