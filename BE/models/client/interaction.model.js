const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  sessionId: {
    type: String,
    required: true,
  },
  actionType: {
    type: String,
    enum: ["VIEW_PRODUCT", "CLICK_CATEGORY", "SEARCH", "ADD_TO_CART"],
    required: true,
  },
  targetId: {
    type: String,
    required: true, // ID sản phẩm hoặc tên danh mục tương ứng
  },
  metadata: {
    type: Object,
    default: {}, // Lưu thêm thông tin phụ (ví dụ: từ khóa tìm kiếm)
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Interaction = mongoose.model(
  "Interaction",
  interactionSchema,
  "User_behavior",
);
module.exports = Interaction;
