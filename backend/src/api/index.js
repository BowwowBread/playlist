import Router from 'koa-router';
import user from './user';
import playList from './playList';
import auth from './auth';

const api = new Router();


api.get('/', (ctx) => {
  ctx.body = 'home';
});
api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/playlist', playList.routes());


module.exports = api;