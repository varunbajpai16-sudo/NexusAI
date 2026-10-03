import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {authProxy} from "./Middlewares/Proxy.middleware.js"
dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use("/api/gateway/health",(req,res)=>{
    res.send("Gateway API is running 🚀 ");
})
app.use("/api/auth",authProxy);

export default app;
