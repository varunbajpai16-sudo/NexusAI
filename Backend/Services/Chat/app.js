import express from 'express';
import dotenv from 'dotenv';
import chatRoute from './Routes/chat.route.js';
dotenv.config();

const app = express();


app.use(express.json());
app.use('/api/chat', chatRoute);

export default app;
