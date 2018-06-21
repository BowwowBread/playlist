require('dotenv').config();
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
import jwt from 'jsonwebtoken';

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, {
      expiresIn: '7d' // set expired 7day
    }, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
}

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
}

const checkToken = async (ctx, next) => {
  let token = ctx.req.headers.authorization;
  if (!token) {
    ctx.status = 403;
    ctx.body = 'not token';
  }
  try {
    const decoded = await decodeToken(token); // decoding token
    if ((Date.now() / 1000) - decoded.iat > 60 * 60 * 24) {
      const {
        name, email, thumbnail, accessToken, refreshToken,
      } = decoded;
      token = await generateToken({
        name,
        email,
        thumbnail,
        accessToken,
        refreshToken,
      }, 'userInfo');
    }

    ctx
      .cookies
      .set('token', token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
    ctx.req.user = decoded;
    next();
  } catch (e) {
    // token validate 실패
    console.log('token check error');
    ctx.req.user = null;
    ctx.body = e;
  }
};

exports.generateToken = generateToken;
exports.checkToken = checkToken;