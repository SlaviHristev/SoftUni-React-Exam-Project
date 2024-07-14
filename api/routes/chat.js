import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { startChat } from '../controllers/chat.js';

const router = express.Router();


router.post('/startChat', verifyToken, startChat);

export default router;