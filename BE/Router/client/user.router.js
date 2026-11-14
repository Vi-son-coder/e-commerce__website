const express = require("express");
const userController = require("../../controllers/client/users.controller");
const requireAuth = require("../../middlewares/client/auth.middleware");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", requireAuth, userController.me);
router.post("/logout", requireAuth, userController.logout);
router.patch("/addToCart", requireAuth, userController.addToCart);
router.delete("/removeFromCart", requireAuth, userController.removeFromCart);
router.patch(
  "/updateProductInCart",
  requireAuth,
  userController.updateProductInCart,
);
module.exports = router;
