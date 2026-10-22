import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AgentRoute from "./Routes/Agent.route.js"
import cors from "cors"
dotenv.config()

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
app.use("/api/agent/health",(req,res)=>{
    res.send(`🚀 Agent api Running on Port:${process.env.PORT}`)
})
app.use("/api/agent",AgentRoute);

export default app;