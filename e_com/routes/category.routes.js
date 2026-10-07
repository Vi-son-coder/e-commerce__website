import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getCategories,
getCategoryById,
createCategory,
updateCategory,
deleteCategory
} from "../controllers/category.controller.js";

const router = express.Router();
validateIdParams(router);

// Lấy tất cả category
router.get("/", getCategories);

// Lấy category theo ID
router.get("/:id", getCategoryById);

// Tạo category
router.post("/", createCategory);

// Cập nhật category
router.put("/:id", updateCategory);

// Xóa category
router.delete("/:id", deleteCategory);

export default router;