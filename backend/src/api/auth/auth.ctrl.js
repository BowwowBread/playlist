import passport from 'koa-passport';
import request from 'request';
import jwt from '../../lib/token';
import User from '../../models/User';

const callback = async (ctx) => {
  await passport.authenticate('google', async (err, user) => {
    if (user === false) {
      ctx.redirect('/api/user/sign/fail');
    } else {
      // 유저 검색 -> 성공 시 업데이트, 실패시 생성
      const userInfo = await User.findByEmail(user.email)
        ? await User.updateUser({
          name: user.name,
          email: user.email,
          thumbnail: user.thumbnail,
          accessToken: user.accessToken,
        })
        : await User.signUp({
          name: user.name,
          email: user.email,
          thumbnail: user.thumbnail,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken
        });
      const token = await jwt.generateToken({
        name: userInfo.name,
        email: userInfo.email,
        thumbnail: userInfo.thumbnail,
      });
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
  ctx
    .cookies
    .set('token', null, {});
  ctx.status = 204;
};

exports.callback = callback;
exports.logout = logout;
