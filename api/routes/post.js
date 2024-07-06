import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addPost } from '../controllers/post.js';

const router = express.Router();

router.post('/',verifyToken, addPost);

export default router;