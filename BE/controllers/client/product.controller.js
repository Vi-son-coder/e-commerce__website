const Products = require("../../models/client/product.model");
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
  const products = await Products.find(find);
  res.json(products);
};
