const Users = require("../../models/client/users.model");
const crypto = require("node:crypto");
const { promisify } = require("node:util");
const scrypt = promisify(crypto.scrypt);

function publicUser(user) {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };
}

async function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  const [algorithm, salt, storedHash] = storedPassword.split("$");

  if (algorithm !== "scrypt" || !salt || !storedHash) {
    const supplied = Buffer.from(password);
    const expected = Buffer.from(storedPassword);
    return (
      supplied.length === expected.length &&
      crypto.timingSafeEqual(supplied, expected)
    );
  }

  const hash = await scrypt(password, salt, 64);
  const expected = Buffer.from(storedHash, "hex");
  return (
    expected.length === hash.length && crypto.timingSafeEqual(hash, expected)
  );
}

async function createSession(user) {
  const token = crypto.randomBytes(32).toString("hex");
  user.authTokenHash = crypto.createHash("sha256").update(token).digest("hex");
  user.authTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await user.save();
  return { token, user: publicUser(user) };
}

module.exports.register = async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "")
    .trim()
    .toLowerCase();
  const password = String(req.body.password || "");

  if (!name || name.length > 100) {
    return res.status(400).json({ message: "Vui lòng nhập họ tên hợp lệ" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ message: "Email không hợp lệ" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Mật khẩu cần có ít nhất 8 ký tự" });
  }

  try {
    const existingUser = await Users.findOne({
      $or: [{ email }, { username: email }],
    }).select("_id");
    if (existingUser) {
      return res.status(409).json({ message: "Email này đã được đăng ký" });
    }

    const [firstName, ...lastNameParts] = name.split(/\s+/);
    const user = await Users.create({
      firstName,
      lastName: lastNameParts.join(" "),
      email,
      username: email,
      password: password,
      cart: [],
    });

    return res.status(201).json(await createSession(user));
  } catch (error) {
    console.error("Lỗi đăng ký tài khoản:", error.message);
    return res.status(500).json({ message: "Không thể tạo tài khoản lúc này" });
  }
};

module.exports.login = async (req, res) => {
  const identity = String(req.body.email || "")
    .trim()
    .toLowerCase();
  const password = String(req.body.password || "");

  if (!identity || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
  }

  try {
    const user = await Users.findOne({
      $or: [{ email: identity }, { username: identity }],
    }).select("+password +authTokenHash +authTokenExpiresAt");

    if (!user || !(await verifyPassword(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    if (!user.password.startsWith("scrypt$")) {
      user.password = password;
    }

    return res.status(200).json(await createSession(user));
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    return res.status(500).json({ message: "Không thể đăng nhập lúc này" });
  }
};

module.exports.me = async (req, res) => {
  try {
    const user = await Users.findById(req.userId).select(
      "firstName lastName email username cart",
    );
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    return res.json({ user: publicUser(user), cart: user.cart || [] });
  } catch (error) {
    console.error("Lỗi tải thông tin tài khoản:", error.message);
    return res
      .status(500)
      .json({ message: "Không thể tải thông tin tài khoản" });
  }
};

module.exports.logout = async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.userId, {
      $unset: { authTokenHash: 1, authTokenExpiresAt: 1 },
    });
    return res.json({ message: "Đã đăng xuất" });
  } catch (error) {
    console.error("Lỗi đăng xuất:", error.message);
    return res.status(500).json({ message: "Không thể đăng xuất lúc này" });
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { product, quantity } = req.body;
    const user = await Users.findById(userId);
    product[0].quantity = Number(quantity);
    const CartOfUser = user.cart;
    let updateCartInUsers;
    if (!CartOfUser || CartOfUser.length === 0) {
      updateCartInUsers = await Users.findOneAndUpdate(
        { _id: userId },
        { $push: { cart: product[0] } },
        { returnDocument: "after" },
      );
    } else {
      updateCartInUsers = await Users.findOneAndUpdate(
        { _id: userId, "cart._id": product[0]._id },
        { $inc: { "cart.$[product].quantity": quantity } },
        {
          arrayFilters: [{ "product._id": product[0]._id }],
          returnDocument: "after",
        },
      );
      if (!updateCartInUsers) {
        updateCartInUsers = await Users.findOneAndUpdate(
          { _id: userId },
          { $push: { cart: product[0] } },
          { returnDocument: "after" },
        );
      }
    }
    res.status(200).json(updateCartInUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports.removeFromCart = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  let updateCartInUsers = await Users.findOneAndUpdate(
    { _id: userId, "cart._id": productId },
    {
      $pull: { cart: { _id: productId } },
    },
    { returnDocument: "after" },
  );
  res.status(200).json(updateCartInUsers);
};

module.exports.updateProductInCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, ...Data } = req.body;
    const updateData = {};
    for (const key in Data) {
      updateData[`cart.$[product].${key}`] = Data[key];
    }

    let updateProductInCartInUser = await Users.findOneAndUpdate(
      { _id: userId, "cart._id": productId },
      {
        $set: updateData,
      },
      {
        arrayFilters: [{ "product._id": productId }],
        returnDocument: "after",
      },
    );
    console.log(req.body);
    res.status(200).json(updateProductInCartInUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
