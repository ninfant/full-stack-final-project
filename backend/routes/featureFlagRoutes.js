import express from "express";
import {
  // getAllFeatureFlags,
  addFeatureFlag,
  toggleFeature,
  deleteFlag,
} from "../controllers/featureFlagController.js";

import { permissionsMiddleware } from "../middlewares/permissionsMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// this is global- all my routes require API Key and JsonWebToken Auth
router.use(authMiddleware, permissionsMiddleware);

// router.get("/feature-flags", getAllFeatureFlags);
router.post("/feature-flags", addFeatureFlag);
router.put("/feature-flags/:id/toggle", toggleFeature);
router.delete("/feature-flags/:id", deleteFlag);

export default router;
