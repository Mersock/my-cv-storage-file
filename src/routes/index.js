import express from 'express';
import uploadPosts from './v1/uploadPosts';
import uploadProfile from './v1/uploadProfile';

const router = express.Router();

router.use(uploadPosts);
router.use(uploadProfile);

export default router;
