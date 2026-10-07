import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getCustomers,
getCustomerById,
createCustomer,
updateCustomer,
deleteCustomer
} from "../controllers/customer.controller.js";

const router = express.Router();
validateIdParams(router);

// GET tất cả khách hàng
router.get("/", getCustomers);

// GET khách hàng theo ID
router.get("/:id", getCustomerById);

// POST tạo khách hàng
router.post("/", createCustomer);

// PUT cập nhật khách hàng
router.put("/:id", updateCustomer);

// DELETE khách hàng
router.delete("/:id", deleteCustomer);

export default router;