import express from 'express';
import passport from 'passport';


import authRoute from './authRoute.js';
import userRoute from './userRouter.js';
import awsRoute from './awsFileRoute.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', passport.authenticate('jwt', {session: false }), userRoute);
router.use('/aws', passport.authenticate('jwt', {session: false }), awsRoute)

export default router;