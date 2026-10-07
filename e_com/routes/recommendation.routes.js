import express from "express";
import { validateIdParams } from "../middleware/validateParams.js";

import {
getRecommendations,
getRecommendationById,
getRecommendationsByUser,
createRecommendation,
deleteRecommendation,
generateRecommendations
} from "../controllers/recommendation.controller.js";

const router = express.Router();
validateIdParams(router);

router.post("/generate/:userId", generateRecommendations);
router.get("/", getRecommendations);
router.get("/user/:userId", getRecommendationsByUser);
router.get("/:id", getRecommendationById);

router.post("/", createRecommendation);
router.delete("/:id", deleteRecommendation);

export default router;