const jwtSecret = process.env.JWT_SECRET;
import jwt from 'jsonwebtoken';
/**
 * create token
 * @param {any} payload
 * @returns {string} token
 */
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

const jwtMiddleware = async (ctx, next) => {
  const token = ctx
    .cookies
    .get('token'); // read token from ctx
  if (!token) {
    return next();
  }
  try {
    const decoded = await decodeToken(token); // decoding token
    if ((Date.now() / 1000) - decoded.iat > 60 * 60 * 24) {
      // regenerate
      const { name, email, photo } = decoded;
      const freshToken = await generateToken({
        name,
        email,
        photo
      }, 'userInfo');
      ctx
        .cookies
        .set('token', freshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
          httpOnly: true
        });
    }

    // ctx.request.user 에 디코딩된 값을 넣어줍니다
    ctx.req.user = decoded;
  } catch (e) {
    // token validate 실패
    ctx.req.user = null;
  }
  return next();
};

exports.generateToken = generateToken;
exports.jwtMiddleware = jwtMiddleware;