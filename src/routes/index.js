import express from 'express';
import uploadFile from './v1/uploadFile';

const router = express.Router();

router.use(uploadFile);

export default router;
