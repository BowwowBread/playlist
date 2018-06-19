require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import cors from 'koa-cors';
import auth from './lib/auth';

// const { jwtMiddleware } = require('./lib/token');

const api = require('./api');

const {
  PORT: port = 3001
} = process.env;

const app = new Koa();
const router = new Router();

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

app.keys = ['secret'];

app
  .use(cors())
  .use(bodyParser())
  .use(session({}, app))
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

router.use('/api', api.routes());