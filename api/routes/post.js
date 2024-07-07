import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addPost, deletePost, getPost, getPosts, updatePost,getRecent } from '../controllers/post.js';

const router = express.Router();

router.post('/',verifyToken, addPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.delete('/:id', verifyToken, deletePost);
router.put('/edit/:id', verifyToken, updatePost);
router.get('/recent', getRecent)

export default router;