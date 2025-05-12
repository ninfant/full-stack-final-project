import express from "express";
import dotenv from "dotenv";
import demoRoutes from "./routes/demoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/api", demoRoutes);

app.get("/", (req, res) => {
  res.send("Demo MS2 Service is live");
});

app.listen(PORT, () => {
  console.log(`MS2 running at http://localhost:${PORT}`);
});
