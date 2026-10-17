
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

const corsOptions = {
  origin: "http://localhost:5173",
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
app.use("/api/agent",prot, agentProxy);

export default app;
