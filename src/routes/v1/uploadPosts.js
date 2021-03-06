import express from 'express';
import permissions from 'express-jwt-permissions';
import { create } from '../../controller/v1/uploadPosts';
import { authLogin } from '../../middlewares/authentications';
import { validateCreate } from '../../validations/uploadPosts';

const guard = permissions();
const router = new express.Router();

const createMiddleware = [
  authLogin,
  guard.check(['admin'], ['posts.create', 'posts.update'])
];

router.post('/v1/upload/posts', createMiddleware, validateCreate, create);

export default router;
