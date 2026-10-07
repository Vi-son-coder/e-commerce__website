import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getAIModels,
getAIModelById,
createAIModel,
updateAIModel,
deleteAIModel,
trainAIModel
} from "../controllers/aiModel.controller.js";

const router = express.Router();
validateIdParams(router);

router.get("/", getAIModels);
router.get("/:id", getAIModelById);
router.post("/", createAIModel);
router.put("/:id", updateAIModel);
router.post("/:id/train", trainAIModel);
router.delete("/:id", deleteAIModel);

export default router;