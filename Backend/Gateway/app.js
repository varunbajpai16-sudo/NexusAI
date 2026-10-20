
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

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
  allowedHeaders: ["Content-Type", "Authorization", "X-User-Id"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.get("/api/gateway/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Gateway API is running",
  });
});

const services = [
  {
    name: "Auth Service",
    baseUrl: process.env.AUTH_SERVICE_URL,
    healthPath: process.env.AUTH_HEALTH_PATH || "/api/auth/health",
  },
  {
    name: "Chat Service",
    baseUrl: process.env.CHAT_SERVICE_URL,
    healthPath: process.env.CHAT_HEALTH_PATH || "/api/chat/health",
  },
  {
    name: "Agent Service",
    baseUrl: process.env.AGENT_SERVICE_URL,
    healthPath: process.env.AGENT_HEALTH_PATH || "/api/agent/health",
  },
];

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function checkService(service) {
  if (!service.baseUrl) {
    return {
      name: service.name,
      ready: false,
      error: "Service URL is missing",
    };
  }

  const url =
    `${service.baseUrl.replace(/\/+$/, "")}/` +
    service.healthPath.replace(/^\/+/, "");

  for (let attempt = 1; attempt <= 12; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        validateStatus: () => true,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log(`${service.name} is ready`);
        return { name: service.name, ready: true };
      }

      console.warn(
        `${service.name}: HTTP ${response.status}, attempt ${attempt}/12`
      );
    } catch (error) {
      console.warn(
        `${service.name}: attempt ${attempt}/12 failed`,
        error.code || error.message
      );
    }

    if (attempt < 12) await sleep(5000);
  }

  return {
    name: service.name,
    ready: false,
    error: "Service did not become ready",
  };
}

app.get("/api/gateway/warmup", async (req, res) => {
  try {
    const results = await Promise.all(services.map(checkService));
    const ready = results.every((service) => service.ready);

    return res.status(ready ? 200 : 503).json({
      ready,
      services: results,
    });
  } catch (error) {
    console.error("Warm-up error:", error.message);

    return res.status(500).json({
      ready: false,
      message: "Could not complete service warm-up",
    });
  }
});

app.use("/api/auth/health", authProxy);
app.use("/api/chat/health", chatProxy);
app.use("/api/agent/health", agentProxy);

app.use("/api/auth", authProxy);
app.use("/api/chat", prot, chatProxy);
app.use("/api/agent", prot, agentProxy);

export default app;
