import passport from 'koa-passport';

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: `http://localhost:${process.env.PORT}/api/auth/callback`,
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  const user = {
    accessToken,
    name: profile.displayName,
    email: profile.email,
    photo: profile.photos[0].value,
  };
  console.log('user', user);
  return done(null, user);
}));