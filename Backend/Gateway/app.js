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

const normalizeOrigin = (url = "") => url.trim().replace(/\/+$/, "");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
]
  .filter(Boolean)
  .map(normalizeOrigin);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
      return callback(null, true);
    }

    console.error("CORS blocked origin:", origin);
    return callback(new Error("CORS origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-User-Id",
  ],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicitly handle browser preflight requests.
app.options(/.*/, cors(corsOptions));

app.get("/api/gateway/health", (req, res) => {
  res.status(200).send("Gateway API is running 🚀");
});

app.use("/api/auth", authProxy);
app.use("/api/chat", prot, chatProxy);
app.use("/api/agent", prot, agentProxy);

export default app;