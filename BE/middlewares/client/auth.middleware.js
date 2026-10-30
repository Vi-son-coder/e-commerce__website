const crypto = require("node:crypto");
const Users = require("../../models/client/users.model");

module.exports = async (req, res, next) => {
  const authorization = req.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !/^[a-f\d]{64}$/i.test(token || "")) {
    return res.status(401).json({ message: "Vui lòng đăng nhập để tiếp tục" });
  }

  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await Users.findOne({
      authTokenHash: tokenHash,
      authTokenExpiresAt: { $gt: new Date() },
    }).select("_id");

    if (!user) {
      return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
    }

    req.userId = user._id.toString();
    return next();
  } catch (error) {
    console.error("Lỗi xác thực người dùng:", error.message);
    return res.status(500).json({ message: "Không thể xác thực tài khoản" });
  }
};
