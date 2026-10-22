
import express from "express";
import dotenv from "dotenv";
import AuthRoute from "./Routes/Auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://nexus-ai-kappa-flax.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/api/auth/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Auth API is running 🚀",
  });
});

// Auth routes
app.use("/api/auth", AuthRoute);

export default app;
