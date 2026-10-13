const Products = require("../../models/client/product.model");
//req để gửi yêu cầu đến DB để lấy dữ liệu
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  if (req.query.keyword) {
    find.title = RegExp(req.query.keyword,'i');
  }

  const product = await Products.find(find);
  console.log(req.query.keyword);
  res.send(product);
};
