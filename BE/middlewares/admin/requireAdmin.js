const Users = require("../../models/client/users.model");
const requireAuth = require("../client/auth.middleware");

module.exports = (req, res, next) => {
  requireAuth(req, res, async () => {
    try {
      const user = await Users.findById(req.userId).select("isAdmin");
      if (!user || user.isAdmin !== true) {
        return res.status(403).json({ message: "Tài khoản không có quyền quản trị" });
      }
      return next();
    } catch (error) {
      console.error("Lỗi xác thực quyền quản trị:", error.message);
      return res.status(500).json({ message: "Không thể xác thực quyền quản trị" });
    }
  });
};
