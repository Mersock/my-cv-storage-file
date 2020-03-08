import express from 'express';
import permissions from 'express-jwt-permissions';
import { create } from '../../controller/v1/uploadFile';
import { authLogin } from '../../middlewares/authentications';
import { validateCreate } from '../../validations/uploadFile';

const guard = permissions();
const router = new express.Router();

const createMiddleware = [authLogin, guard.check(['admin'], ['upload.create'])];

router.post('/v1/upload', createMiddleware, validateCreate, create);

export default router;
