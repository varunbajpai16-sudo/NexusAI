import express from 'express';
import dotenv from 'dotenv';
import chatRoute from './Routes/chat.route.js';
dotenv.config();

const app = express();

const allowedOrigins = [process.env.MAIN_ORIGEN, process.env.SERVICE_ORIGEN];


app.use(express.json());
app.use('/api/chat', chatRoute);

export default app;
