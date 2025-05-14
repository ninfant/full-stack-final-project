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

// Estas dos líneas para que __dirname funcione con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "apikey"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", flagRoutes);
app.use("/api/meta", customerRegionRoutes); // api/meta/customers, /regions
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API is live!");
});
// Servir los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// // Catch-all route para que React maneje rutas del frontend
// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
// });

// Catch-all route para que React maneje rutas del frontend
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
