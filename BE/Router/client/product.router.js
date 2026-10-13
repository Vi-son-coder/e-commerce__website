const express = require("express");
const router = express.Router();
const productController = require('../../controllers/client/product.controller');

router.get('/',productController.index);
router.patch('/edit',productController.edit);
router.get('/search',productController.search);

module.exports = router;