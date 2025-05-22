import dotenv from 'dotenv';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';


import User from '../model/userSchema.js';
dotenv.config();

const opts= {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, async (jwtpayload, done) => {
  try {
    const user = await User.findById(jwtpayload._id).select('-password');
    
    if (!user) {
      return done(null, false);
    } 
    
    return done(null, user);
  } catch (error) {
    console.log('Error in passport JWT strategy:', error);
    return done(error);
  }
}))

export default passport;