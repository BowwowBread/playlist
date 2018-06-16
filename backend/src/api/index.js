import Router from 'koa-router';
import auth from './auth';
import playlist from './playlist';

const api = new Router();


api.get('/', (ctx) => {
  console.log('user', ctx.req.user);
  ctx.body = 'home';
});
api.use('/auth', auth.routes());
api.use('/playlist', playlist.routes());


module.exports = api;