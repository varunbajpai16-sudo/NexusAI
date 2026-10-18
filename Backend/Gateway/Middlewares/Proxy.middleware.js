
import { createProxyMiddleware } from "http-proxy-middleware";

export const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": "/api/auth",
  },
});

export const chatProxy = createProxyMiddleware({
  target: process.env.CHAT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/chat": "/api/chat",
  },
});

export const agentProxy = createProxyMiddleware({
  target: process.env.AGENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/agent": "/api/agent",
  },
});
