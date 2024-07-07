import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addPost, deletePost, getPost, getPosts } from '../controllers/post.js';

const router = express.Router();

router.post('/',verifyToken, addPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.delete('/:id', verifyToken, deletePost);

export default router;