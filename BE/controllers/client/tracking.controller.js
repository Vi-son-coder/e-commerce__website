const Interaction = require("../../models/client/interaction.model");

module.exports.index = async (req, res) => {
  try {
    const { sessionId, actionType, targetId, metadata } = req.body;
    const userId = req.user ? req.user.id : null;
    await Interaction.create({
      userId,
      sessionId,
      actionType,
      targetId,
      metadata,
    });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("Lỗi lưu tracking:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
