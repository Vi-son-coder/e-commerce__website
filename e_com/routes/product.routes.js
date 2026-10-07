import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct
} from "../controllers/product.controller.js";

const router = express.Router();
validateIdParams(router);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;