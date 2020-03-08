import express from 'express';
import permissions from 'express-jwt-permissions';
import { create } from '../../controller/v1/uploadProfile';
import { authLogin } from '../../middlewares/authentications';
import { validateCreate } from '../../validations/uploadProfile';

const guard = permissions();
const router = new express.Router();

const createMiddleware = [
  authLogin,
  guard.check(['admin'], ['users.create', 'users.update'])
];

router.post('/v1/upload/profile', createMiddleware, validateCreate, create);

export default router;
