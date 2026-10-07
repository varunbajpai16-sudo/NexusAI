import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./Routes/chat.route.js";
dotenv.config()

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    craedentials: true,
}))
app.use(express.json());
app.use("/api/chat", chatRoute);


export default app;