import express from 'express';
import { getSavedPosts, getUser, savePost, updateUser } from '../controllers/user.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/:id/saved', getSavedPosts);
router.post('/save/:id', savePost);
router.put('/:id',verifyToken, updateUser);

export default router;