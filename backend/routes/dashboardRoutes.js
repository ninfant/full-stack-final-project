import express from "express";
import { getFlagsOverview } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { permissionsMiddleware } from "../middlewares/permissionsMiddleware.js";

const router = express.Router();

router.use(authMiddleware, permissionsMiddleware);

router.get("/flags-overview", getFlagsOverview);

export default router;
