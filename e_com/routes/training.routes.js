import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getTraining,
getTrainingById,
getTrainingByModel,
getTrainingByUser,
createTraining,
deleteTraining
} from "../controllers/training.controller.js";

const router = express.Router();
validateIdParams(router);

router.get("/", getTraining);
router.get("/model/:modelId", getTrainingByModel);
router.get("/user/:userId", getTrainingByUser);
router.get("/:id", getTrainingById);

router.post("/", createTraining);
router.delete("/:id", deleteTraining);

export default router;