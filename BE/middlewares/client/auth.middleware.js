const crypto = require("node:crypto");
const Users = require("../../models/client/users.model");

async function findUserId(token) {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const user = await Users.findOne({
    authTokenHash: tokenHash,
    authTokenExpiresAt: { $gt: new Date() },
  }).select("_id");

  return user ? user._id.toString() : null;
}

module.exports = async (req, res, next) => {
  const authorization = req.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !/^[a-f\d]{64}$/i.test(token || "")) {
    return res.status(401).json({ message: "Vui lòng đăng nhập để tiếp tục" });
  }

  try {
    const userId = await findUserId(token);
    if (!userId) {
      return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
    }

    req.userId = userId;
    return next();
  } catch (error) {
    console.error("Lỗi xác thực người dùng:", error.message);
    return res.status(500).json({ message: "Không thể xác thực tài khoản" });
  }
};

module.exports.optional = async (req, res, next) => {
  const authorization = req.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !/^[a-f\d]{64}$/i.test(token || "")) {
    return next();
  }

  try {
    req.userId = await findUserId(token);
    return next();
  } catch (error) {
    console.error("Lỗi xác thực người dùng tùy chọn:", error.message);
    return res.status(500).json({ message: "Không thể xác thực tài khoản" });
  }
};
