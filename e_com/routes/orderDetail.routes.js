import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getOrderDetails,
getOrderDetailById,
getDetailsByOrder,
createOrderDetail,
updateOrderDetail,
deleteOrderDetail
} from "../controllers/orderDetail.controller.js";

const router = express.Router();
validateIdParams(router);

// GET tất cả chi tiết đơn hàng
router.get("/", getOrderDetails);

// GET chi tiết theo ID
router.get("/:id", getOrderDetailById);

// GET các sản phẩm trong một đơn hàng
router.get("/order/:orderId", getDetailsByOrder);

// POST tạo chi tiết đơn hàng
router.post("/", createOrderDetail);

// PUT cập nhật chi tiết đơn hàng
router.put("/:id", updateOrderDetail);

// DELETE chi tiết đơn hàng
router.delete("/:id", deleteOrderDetail);

export default router;