import passport from 'koa-passport';
import request from 'request-promise';
import User from '../models/User';
import jwt from '../lib/token';

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

const getTokenInfo = async (accessToken) => {
  const options = {
    uri: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
    qs: {
      access_token: accessToken
    },
    json: true
  };
  const tokenInfo = await request(options);
  return tokenInfo;
};

const refreshingAccessToken = async (refreshToken) => {
  const { clientID, clientSecret } = process.env;
  console.log(refreshToken);
  const options = {
    method: 'POST',
    uri: 'https://www.googleapis.com/oauth2/v4/token',
    headers: {
      contentType: 'application/x-www-form-urlencoded'
    },
    qs: {
      client_id: clientID,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    },
    json: true
  };
  try {
    const refreshAccessToken = await request(options);
    console.log('3', refreshAccessToken);
    console.log('refresh access token', refreshAccessToken.access_token);
    return refreshAccessToken;
  } catch (e) {
    return e;
  }
};

const checkAccessToken = async (ctx, next) => {
  const {
    name, email, thumbnail, accessToken, refreshToken
  } = ctx.req.user;

  try {
    // check token info
    await getTokenInfo(accessToken);
  } catch (e) {
    // expire access token
    const refreshAccessToken = await refreshingAccessToken(refreshToken);
    const userInfo = await User.updateUser({
      name,
      email,
      thumbnail,
      accessToken: refreshAccessToken,
      refreshToken
    });
    const token = await jwt.generateToken({
      name: userInfo.name,
      email: userInfo.email,
      thumbnail: userInfo.thumbnail,
      accessToken: userInfo.accessToken,
      refreshToken: userInfo.refreshToken
    });
    ctx.req.user.accessToken = refreshAccessToken;
    ctx
      .cookies
      .set('token', token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
  }
  await next();
};

exports.checkAccessToken = checkAccessToken;