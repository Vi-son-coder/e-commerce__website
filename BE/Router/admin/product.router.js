const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/admin/products.controller.js");
const requireAdmin = require("../../middlewares/admin/requireAdmin");

router.use(requireAdmin);
router.get("/", productsController.index);
router.post("/", productsController.create);
router.put("/:id", productsController.update);
router.delete("/bulk", productsController.removeMany);
router.delete("/:id", productsController.remove);

module.exports = router;
