import passport from 'koa-passport';
import jwt from '../../lib/token';

const callback = async (ctx) => {
  await passport.authenticate('google', async (err, user) => {
    if (user === false) {
      ctx.redirect('/api/auth/fail');
    } else {
      const userInfo = {
        name: user.name,
        email: user.email,
        photo: user.photo
      };
      const token = await jwt.generateToken(userInfo);
      ctx
        .cookies
        .set('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7
        });
      ctx.redirect('/api');
    }
  })(ctx);
};

const logout = async (ctx) => {
  ctx
    .cookies
    .set('token', null, {
      maxAge: 0,
      httpOnly: true
    });
  ctx.status = 204;
};

const check = (ctx) => {
  const { user } = ctx.req;

  if (!user) {
    ctx.status = 403;
    return;
  }

  ctx.body = user;
};
exports.callback = callback;
exports.logout = logout;
exports.check = check;
