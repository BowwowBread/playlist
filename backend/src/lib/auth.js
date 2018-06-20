import passport from 'koa-passport';
import User from '../models/User';

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: `http://localhost:${process.env.PORT}/api/user/sign/callback`,
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    const getUser = await User.findByEmail(profile.email);
    console.log('user', getUser);
  } catch (e) {
    console.log(e);
  }
  const user = {
    accessToken,
    name: profile.displayName,
    email: profile.email,
    photo: profile.photos[0].value,
  };
  return done(null, user);
}));