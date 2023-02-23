import { Router } from 'express';
import { userRouter } from './user';

const router = Router();

router.get('/check-health', (req, res) => res.sendStatus(200));

router.use('/users', userRouter);
// router.use('/post');
// router.use('/comment');

export default router;
