
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(currentDir, "../.env"),
   quiet: true,
});

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./Config/Db.config.js");
const { connectRedis } = await import("../redis.js");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    await connectRedis();
    console.log("Redis connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Nexus API Gateway running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Gateway:", error.message);
    process.exit(1);
  }
};

startServer();
