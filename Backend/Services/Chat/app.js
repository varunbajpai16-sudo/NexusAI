import express from 'express';
import dotenv from 'dotenv';
import chatRoute from './Routes/chat.route.js';
import cors from "cors"
dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "https://nexus-ai-kappa-flax.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use("/api/chat/health",(req,res)=>{
    res.send("chat API is running 🚀 ");
})
app.use('/api/chat', chatRoute);

export default app;
