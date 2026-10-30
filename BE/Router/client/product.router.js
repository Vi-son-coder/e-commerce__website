const express = require("express");
const router = express.Router();
const productController = require("../../controllers/client/product.controller");
const optionalAuth = require("../../middlewares/client/auth.middleware").optional;
router.get(
  "/recommendations/home",
  optionalAuth,
  productController.getHomeRecommendations,
);
router.get(
  "/recommendations/bought-together/:productId",
  productController.getFrequentlyBoughtTogether,
);
router.get("/", productController.index);
router.patch("/edit", productController.edit);
router.get("/search", productController.search);

module.exports = router;
