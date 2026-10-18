
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {
  agentProxy,
  authProxy,
  chatProxy,
} from "./Middlewares/Proxy.middleware.js";

import prot from "./Middlewares/protected.middleware.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header, such as server-to-server calls.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.get("/api/gateway/health", (req, res) => {
  res.send("Gateway API is running 🚀");
});

app.use("/api/auth", authProxy);
app.use("/api/chat", prot, chatProxy);
app.use("/api/agent", prot, agentProxy);

export default app;
