module.exports.index = async (req, res) => {
  try {
    const products = await Products.find({});
    console.log("Danh sách sản phẩm từ DB:", products);
    res.json({ products: products });
  } catch {
    res.status(500).json({ code: 500, message: "Lỗi server" });
  }
};
module.exports.edit = (req, res) => {
  res.send("edit sản phẩm");
};
