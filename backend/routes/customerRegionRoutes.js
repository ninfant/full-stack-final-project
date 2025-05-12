import express from "express";
import {
  addCustomer,
  getCustomers,
  addRegion,
  getRegions,
} from "../controllers/customerRegionController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { permissionsMiddleware } from "../middlewares/permissionsMiddleware.js";

const router = express.Router();

// proteger todo con auth + api key
router.use(authMiddleware, permissionsMiddleware);

// Customer
router.post("/customers", addCustomer);
router.get("/customers", getCustomers);

// Region
router.post("/regions", addRegion);
router.get("/regions", getRegions);

export default router;
