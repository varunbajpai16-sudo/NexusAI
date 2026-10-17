import express from "express";
import dotenv from "dotenv";
import AuthRoute from "./Routes/Auth.route.js"
dotenv.config();

const app = express();  

app.use("/api/auth/health",(req,res)=>{
    res.send("Auth API is running 🚀 ");
})

app.use(express.json());
app.use("/api/auth", AuthRoute);

export default app;