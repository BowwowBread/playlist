import Router from 'koa-router';
import userCtrl from './user.ctrl';
import { checkToken } from '../../lib/token';

const user = new Router();

user.get('/me', checkToken, userCtrl.getUser);

module.exports = user;