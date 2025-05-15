import express from "express";
import { getFlagsOverview } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/flags-overview", getFlagsOverview);

export default router;
