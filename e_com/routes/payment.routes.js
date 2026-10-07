import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getPayments,
getPaymentById,
getPaymentByOrder,
createPayment,
deletePayment
} from "../controllers/payment.controller.js";

const router = express.Router();
validateIdParams(router);

router.get("/", getPayments);
router.get("/order/:orderId", getPaymentByOrder);
router.get("/:id", getPaymentById);
router.post("/", createPayment);
router.delete("/:id", deletePayment);

export default router;