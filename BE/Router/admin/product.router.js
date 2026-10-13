const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/admin/products.controller.js");

router.get("/", productsController.index);

module.exports = router;
