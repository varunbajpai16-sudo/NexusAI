import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();
export const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/api/auth/',
  },
  on: {
    proxyReq: (proxyReq, req) => {
      console.log('Authorization:', req.headers.authorization);
    },
  },
});

export const chatProxy = createProxyMiddleware({
  target: process.env.CHAT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/api/chat/',
  },
});

export const agentProxy = createProxyMiddleware({
  target: process.env.AGENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/api/agent/',
  },
});
