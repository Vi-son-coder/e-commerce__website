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
  const keyword = req.query.keyword;
  const find = {
    status: "active",
    deleted: false,
  };
  if (req.query.keyword) {
    find.title = RegExp(keyword, "i");
  }
  if (req.query.id) {
    find._id = req.query.id;
  }

  const category = req.query.category;
  if (category) {
    find.category = category;
  }
  const products = await Products.find(find);
  res.json(products);
};
