import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addChat } from '../controllers/chat.js';

const router = express.Router();


router.get('/addChat', verifyToken, addChat);

export default router;