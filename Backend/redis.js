
import { createClient } from "redis";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

dotenv.config({
  path: path.join(currentDir, ".env"),
});

if (!process.env.REDIS_URL) {
  throw new Error(
    `REDIS_URL is missing. Checked: ${path.join(currentDir, ".env")}`
  );
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err.message, err.code);
});

redisClient.on("ready", () => {
  console.log("Redis ready 🚀");
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;
