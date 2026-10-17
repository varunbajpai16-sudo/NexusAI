import app from './app.js';
import connectDB from "./Config/db.config.js"
const PORT = process.env.PORT;

app.listen(PORT, async() => {
   await  connectDB();
  console.log(`🚀 Nexus API Agent running on port ${PORT}`);
});







