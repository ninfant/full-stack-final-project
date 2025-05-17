import express from "express";
import {
  addCustomer,
  getCustomers,
  addRegion,
  getRegions,
} from "../controllers/customerRegionController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// proteger todo con auth or api key
router.use(authMiddleware);

// Customer
router.post("/customers", addCustomer);
router.get("/customers", getCustomers);

// Region
router.post("/regions", addRegion);
router.get("/regions", getRegions);

export default router;
