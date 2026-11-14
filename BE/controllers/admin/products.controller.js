const Products = require("../../models/client/product.model");
const mongoose = require("mongoose");

function normalizeProduct(body = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) body = {};
  const title = String(body.title || "").trim();
  const brand = String(body.brand || "").trim();
  const category = String(body.category || "").trim();
  const description = String(body.description || "").trim();
  const price = Number(body.price);
  const discountPercentage = Number(body.discountPercentage ?? 0);
  const rating = Number(body.rating ?? 0);
  const status = body.status || "active";
  const images = Array.isArray(body.images)
    ? body.images
        .map((image) => String(image).trim())
        .filter(Boolean)
        .slice(0, 10)
    : [];

  if (!title || title.length > 200) {
    return { error: "Tên sản phẩm không hợp lệ" };
  }
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Giá sản phẩm phải là số không âm" };
  }
  if (
    !Number.isFinite(discountPercentage) ||
    discountPercentage < 0 ||
    discountPercentage > 100
  ) {
    return { error: "Mức giảm giá phải nằm trong khoảng 0-100%" };
  }
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    return { error: "Đánh giá phải nằm trong khoảng 0-5" };
  }
  if (!["active", "inactive"].includes(status)) {
    return { error: "Trạng thái sản phẩm không hợp lệ" };
  }
  if (brand.length > 100 || category.length > 100 || description.length > 5000) {
    return { error: "Thông tin sản phẩm vượt quá độ dài cho phép" };
  }
  if (images.some((image) => image.length > 2048)) {
    return { error: "Đường dẫn hình ảnh vượt quá độ dài cho phép" };
  }

  return {
    value: {
      title,
      brand,
      category,
      description,
      price,
      discountPercentage,
      rating,
      status,
      images,
    },
  };
}

module.exports.index = async (req, res) => {
  try {
    const products = await Products.find({}).sort({ _id: -1 });
    return res.json(products);
  } catch (error) {
    console.error("Lỗi tải danh sách sản phẩm quản trị:", error.message);
    return res.status(500).json({ message: "Không thể tải sản phẩm" });
  }
};

module.exports.create = async (req, res) => {
  const normalized = normalizeProduct(req.body);
  if (normalized.error) {
    return res.status(400).json({ message: normalized.error });
  }

  try {
    const product = await Products.create({
      ...normalized.value,
      deleted: false,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error.message);
    return res.status(500).json({ message: "Không thể tạo sản phẩm" });
  }
};

module.exports.update = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Mã sản phẩm không hợp lệ" });
  }

  const normalized = normalizeProduct(req.body);
  if (normalized.error) {
    return res.status(400).json({ message: normalized.error });
  }

  try {
    const product = await Products.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...normalized.value,
          deleted: normalized.value.status === "inactive",
        },
      },
      { new: true, runValidators: true },
    );
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    return res.json(product);
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error.message);
    return res.status(500).json({ message: "Không thể cập nhật sản phẩm" });
  }
};

module.exports.remove = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Mã sản phẩm không hợp lệ" });
  }

  try {
    const product = await Products.findOneAndUpdate(
      { _id: req.params.id, deleted: { $ne: true } },
      { $set: { deleted: true, status: "inactive" } },
      { new: true },
    );
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    return res.json({ message: "Đã ẩn sản phẩm" });
  } catch (error) {
    console.error("Lỗi ẩn sản phẩm:", error.message);
    return res.status(500).json({ message: "Không thể ẩn sản phẩm" });
  }
};

module.exports.removeMany = async (req, res) => {
  const { ids } = req.body || {};
  if (
    !Array.isArray(ids) ||
    ids.length === 0 ||
    ids.some((id) => !mongoose.isValidObjectId(id))
  ) {
    return res.status(400).json({ message: "Danh sách mã sản phẩm không hợp lệ" });
  }

  try {
    const result = await Products.updateMany(
      { _id: { $in: [...new Set(ids)] }, deleted: { $ne: true } },
      { $set: { deleted: true, status: "inactive" } },
    );
    return res.json({
      message: "Đã ẩn các sản phẩm đã chọn",
      deletedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Lỗi ẩn nhiều sản phẩm:", error.message);
    return res.status(500).json({ message: "Không thể ẩn các sản phẩm đã chọn" });
  }
};
