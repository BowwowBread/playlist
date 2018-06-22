require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import cors from 'koa-cors';
import mongoose from 'mongoose';
import auth from './lib/auth';

const api = require('./api');

const {
  PORT: port = 3001,
  MONGO_URI,
} = process.env;

const app = new Koa();
const router = new Router();

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI)
  .then((response) => {
    console.log('success connect mongoDB');
  })
  .catch((error) => {
    console.log(`fail connect mongoDB error : ${ error}`);
  });

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

app.keys = ['secret'];
// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }
// app.use(async (ctx, next) => {
//   ctx.status = 200;
//   console.log('Setting status');
//   await next(); // forgot await!
// });
// app.use(async (ctx) => {
//   await delay(1000); // simulate actual async behavior
//   console.log('Setting body');
//   ctx.body = 'Hello from Koa';
// });
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