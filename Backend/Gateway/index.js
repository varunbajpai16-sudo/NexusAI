import app from './app.js';
import connectDB from "./Config/Db.config.js"
import { connectRedis } from "../redis.js";
const PORT = process.env.PORT || 5000;


app.listen(PORT, async() => {
   await  connectDB();
   await connectRedis();
  console.log(`🚀 Nexus API Gateway running on port ${PORT}`);
});
