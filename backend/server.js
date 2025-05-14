import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import flagRoutes from "./routes/featureFlagRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import customerRegionRoutes from "./routes/customerRegionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*", // o cámbialo si necesitas restringir
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "apikey"],
  })
);

// API endpoints
app.use("/api/auth", authRoutes);
app.use("/api", flagRoutes);
app.use("/api/meta", customerRegionRoutes);
app.use("/api/dashboard", dashboardRoutes);

//  Servir el frontend desde /client/dist
app.use(express.static(path.join(__dirname, "client", "dist")));

// Fallback para rutas no-API (React routes)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
