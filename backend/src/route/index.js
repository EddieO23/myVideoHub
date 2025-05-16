import express from 'express';
import passport from 'passport';


import authRoute from './authRoute.js';
import userRoute from './userRouter.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', passport.authenticate('jwt', {session: false }), userRoute);


export default router;