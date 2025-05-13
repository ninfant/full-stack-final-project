import express from "express";
import dotenv from "dotenv";
import demoRoutes from "./routes/demoRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// va a permitir todas las peticiones desde cualquier origen (solo recomendable en desarrollo)
app.use(cors());

// Middleware para JSON
app.use(express.json());

app.use("/api", demoRoutes);

app.get("/", (req, res) => {
  res.send("Demo MS2 Service is live");
});

app.listen(PORT, () => {
  console.log(`MS2 running at http://localhost:${PORT}`);
});
