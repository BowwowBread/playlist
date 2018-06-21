import passport from 'koa-passport';
import jwt from '../../lib/token';
import User from '../../models/User';

const getUser = (ctx) => {

  if (!ctx.req.user) {
    ctx.status = 403;
    return;
  }
  const { name, email, thumbnail } = ctx.req.user;

  const userInfo = {
    name,
    email,
    thumbnail
  };
  ctx.body = userInfo;
};

exports.getUser = getUser;
