import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import flagRoutes from "./routes/featureFlagRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import customerRegionRoutes from "./routes/customerRegionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api", flagRoutes);
app.use("/api/meta", customerRegionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Servir React desde ./client/dist
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
