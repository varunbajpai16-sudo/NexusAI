import app from './app.js';
import connectDB from "./Config/Db.config.js"
const PORT = process.env.PORT || 5000;


app.listen(PORT, async() => {
   await  connectDB();
  console.log(`🚀 Nexus API Gateway running on port ${PORT}`);
});
