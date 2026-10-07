import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {authProxy} from "./Middlewares/Proxy.middleware.js"
import prot from "./Middlewares/protected.middleware.js"
import { chatProxy } from './Middlewares/Proxy.middleware.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use("/api/gateway/health",async (req,res)=>{
    res.send("Gateway API is running 🚀 ");
})
app.use("/api/auth",authProxy);
app.use("/api/chat",prot,chatProxy);

export default app;
