import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import flagRoutes from "./routes/featureFlagRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);


app.use("/api/auth", authRoutes);
app.use("/api", flagRoutes);

app.get("/", (req, res) => {
  res.send("API is live!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
