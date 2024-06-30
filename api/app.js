import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', credentials: true
}));
app.use(express.json())
app.use(cookieParser());


app.listen(8800, () => {
    console.log('Server is running on port 8880!');
});

