import express from 'express';
import uploadPosts from './v1/uploadPosts';

const router = express.Router();

router.use(uploadPosts);

export default router;
