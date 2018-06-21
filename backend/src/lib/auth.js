import passport from 'koa-passport';
import request from 'request';

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: `http://localhost:${process.env.PORT}/api/auth/sign/callback`,
  passReqToCallback: true,
  grantType: 'authorization_code'
}, async (req, accessToken, refreshToken, params, profile, done) => {
  const user = {
    accessToken,
    refreshToken,
    name: profile.displayName,
    email: profile.email,
    thumbnail: profile.photos[0].value,
  };
  return done(null, user);
}));

const checkAccessToken = (ctx, next) => {
  const { accessToken } = ctx.req.user;
  const options = {
    uri: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
    qs: {
      access_token: accessToken
    },
    json: true
  };
  console.log(request(options));
  // 토큰 만료기간 체크해야댐..
  next();
};

exports.checkAccessToken = checkAccessToken;