import redisClient from "../../redis.js";

const prot = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {
    const userId = await redisClient.get(`user:${token}`);

    console.log("User ID from Redis:", userId);

    if (!userId) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    // Attach userId to request
    req.headers.authorization = userId;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(500).json({
      message: "Authentication failed from protected middleware",
    });
  }
};

export default prot;