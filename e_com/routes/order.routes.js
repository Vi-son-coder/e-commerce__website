import express from "express";
import { authenticate } from "../utils/auth.js";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getOrders,
getOrderById,
getOrdersByCustomer,
createOrder,
updateOrder,
deleteOrder,
checkout,
getMyOrders
} from "../controllers/order.controller.js";

const router = express.Router();
validateIdParams(router);

router.get("/mine", authenticate, getMyOrders);
router.post("/checkout", authenticate, checkout);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/customer/:userId", getOrdersByCustomer);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;