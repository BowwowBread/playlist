import Router from 'koa-router';
import user from './user';
import playlist from './playlist';

const api = new Router();


api.get('/', (ctx) => {
  ctx.body = 'home';
});
api.use('/user', user.routes());
api.use('/playlist', playlist.routes());


module.exports = api;