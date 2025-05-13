import express from "express";
import { demo1Handler } from "../controllers/demoController.js";

const router = express.Router();

router.get("/demo1", demo1Handler);

export default router;
