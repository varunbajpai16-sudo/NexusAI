
import redisClient from "../../redis.js";

const prot = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Missing or invalid Bearer token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const userId = await redisClient.get(`user:${token}`);

    if (!userId) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    req.headers["x-user-id"] = userId;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(500).json({
      message: "Authentication failed",
    });
  }
};

export default prot;
