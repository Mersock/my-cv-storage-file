import express from 'express';
import permissions from 'express-jwt-permissions';
import multer from 'multer';
import { create } from '../../controller/v1/uploadPosts';
import { authLogin } from '../../middlewares/authentications';
import { validateCreate } from '../../validations/uploadPosts';

const guard = permissions();
const router = new express.Router();

const createMiddleware = [
  authLogin,
  guard.check(['admin'], ['posts.create', 'posts.update'])
];

const upload = multer({ dest: 'uploads/' });

router.post(
  '/v1/upload/posts',
  createMiddleware,
  validateCreate,
  upload.single('file'),
  create
);

export default router;
