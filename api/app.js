import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/dbConfig.js';
import authRoute from './routes/auth.js'

const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173', credentials: true
}));
app.use(express.json())
app.use(cookieParser());
dbConnect();

app.use('/api/auth',authRoute)

app.listen(8800, () => {
    console.log('Server is running on port 8880!');
});

