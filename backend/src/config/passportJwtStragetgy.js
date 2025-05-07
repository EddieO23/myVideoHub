import dotenv from 'dotenv';
import passport from 'passport';
import { ExtractJwt, JwtStrategy} from 'passport-jwt';


import User from '../models/User.js';

const opts= {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretorKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, async (jwtpayload, done) => {
  try {
    const user = await User.findById(jwtpayload.id);
    if (!user) {
      return done(null, false);
    } 
    return done(null, user);
  } catch (error) {
    console.log('Error in passport JWT strategy:', error);
    return done(error, false);
  }
}))

export default passport;