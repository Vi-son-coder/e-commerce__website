import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getBehaviors,
getBehaviorById,
getBehaviorsByUser,
getBehaviorsByProduct,
createBehavior,
updateBehavior,
deleteBehavior
} from "../controllers/behavior.controller.js";

const router = express.Router();
validateIdParams(router);

router.get("/", getBehaviors);
router.get("/user/:userId", getBehaviorsByUser);
router.get("/product/:productId", getBehaviorsByProduct);
router.get("/:id", getBehaviorById);

router.post("/", createBehavior);
router.put("/:id", updateBehavior);
router.delete("/:id", deleteBehavior);

export default router;