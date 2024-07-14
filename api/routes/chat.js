import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getChatHistory, startChat } from '../controllers/chat.js';

const router = express.Router();

router.get('/:chatId', verifyToken, getChatHistory);
router.post('/startChat', verifyToken, startChat);

export default router;