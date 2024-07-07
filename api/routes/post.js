import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addPost, getPost, getPosts } from '../controllers/post.js';

const router = express.Router();

router.post('/',verifyToken, addPost);
router.get('/', getPosts);
router.get('/:id', getPost);

export default router;