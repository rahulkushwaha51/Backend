import dotenv from 'dotenv'
import express, { urlencoded, json } from 'express';
import ErrorMiddleware from './src/middleware/error.js';
import userRouter from './src/router/UserRouter.js';
import './db/db.js'
import cors from 'cors';
dotenv.config();
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
const port = process.env.PORT||5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.use("/api/v1", userRouter)

app.use(ErrorMiddleware)