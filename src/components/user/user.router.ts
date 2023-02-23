import { Router } from 'express';
import userController from './user.controller';
import validate from '../../middleware/validator.middleware';
import userValidation from './user.validation';

const userRouter = Router();

userRouter.post('/login', validate(userValidation.loginSchema), userController.login);
userRouter.post('/register', validate(userValidation.registerSchema), userController.register);
// userRouter.post('/logout');
// userRouter.post('/refresh-token');
// userRouter.get('/');

export default userRouter;
