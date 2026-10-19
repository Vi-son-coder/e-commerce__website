const express = require("express");
const userController = require("../../controllers/client/users.controller");
const router = express.Router();

router.get("/", userController.index);
router.patch("/addToCart", userController.addToCart);
router.delete("/removeFromCart", userController.removeFromCart);
router.patch("/updateProductInCart", userController.updateProductInCart);
module.exports = router;
