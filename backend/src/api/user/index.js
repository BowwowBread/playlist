import Router from 'koa-router';
import passport from 'koa-passport';
import userCtrl from './user.ctrl';
import { checkToken } from '../../lib/token';

const user = new Router();

user.get('/sign', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtubepartner-channel-audit']
}));
user.get('/sign/callback', userCtrl.callback);
user.get('/logout', checkToken, userCtrl.logout);
user.get('/me', checkToken, userCtrl.getUser);
user.get('/', checkToken, userCtrl.check);

module.exports = user;