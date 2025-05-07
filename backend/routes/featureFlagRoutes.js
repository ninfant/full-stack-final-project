import express from "express";
import {
  getAllFeatureFlags,
  addFeatureFlag,
  toggleFeature,
  addRelations,
  deleteFlag,
} from "../controllers/featureFlagController.js";

import { permissionsMiddleware } from "../middlewares/permissionsMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// this is global: all my routes require API Key
router.use(permissionsMiddleware);

// I will apply JWT Auth only to sensitive routes
router.get("/feature-flags", getAllFeatureFlags); // this will have only API Key validation
router.post("/feature-flags", authMiddleware, addFeatureFlag);
router.put("/feature-flags/:id/toggle", authMiddleware, toggleFeature);
router.put("/feature-flags/:id/add-relations", authMiddleware, addRelations);
router.delete("/feature-flags/:id", authMiddleware, deleteFlag);

export default router;
