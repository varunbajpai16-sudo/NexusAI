import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config();

export const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    // Express strips /api/auth from the path when mounted there.
    if (path === "/health" || path === "/") {
      return "/api/auth/health";
    }

    return path.startsWith("/api/auth")
      ? path
      : `/api/auth${path}`;
  },
});

export const chatProxy = createProxyMiddleware({
  target: process.env.CHAT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    if (path === "/health" || path === "/") {
      return "/api/chat/health";
    }

    return path.startsWith("/api/chat")
      ? path
      : `/api/chat${path}`;
  },
});

export const agentProxy = createProxyMiddleware({
  target: process.env.AGENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    if (path === "/health" || path === "/") {
      return "/api/agent/health";
    }

    return path.startsWith("/api/agent")
      ? path
      : `/api/agent${path}`;
  },
});