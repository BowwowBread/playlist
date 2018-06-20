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
        photo: user.photo,
        accessToken: user.accessToken
      };
      const token = await jwt.generateToken(userInfo);
      console.log('token', token);
      ctx
        .cookies
        .set('token', token, {
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 24 * 7
        });
      ctx.redirect('http://localhost:3000');
    }
  })(ctx);
};

const logout = async (ctx) => {
  console.log(ctx.cookies.get('token'));
  ctx
    .cookies
    .set('token', null, {

    })
  ctx.status = 204;
};

const getUser = (ctx) => {
  const { name, email, photo } = ctx.req.user;

  if (!ctx.req.user) {
    ctx.status = 403;
    return;
  }
  const userInfo = {
    name,
    email,
    photo
  };
  ctx.body = userInfo;
};

const check = (ctx) => {
  console.log(ctx.req.user);
  const { accessToken } = ctx.req.user;

  ctx.body = accessToken;
};

exports.callback = callback;
exports.logout = logout;
exports.getUser = getUser;
exports.check = check;
