const Users = require("../../models/client/users.model");
module.exports.index = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  let find = { username: username, password: password };
  const user = await Users.find(find);
  res.json(user);
};

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.query.id;
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
  const userId = req.query.id;
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
    const userId = req.query.id;
    const {productId,...Data} = req.body;
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
    console.log( req.body);
    res.status(200).json(updateProductInCartInUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
