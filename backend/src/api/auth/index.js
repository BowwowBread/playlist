import Router from 'koa-router';
import passport from 'koa-passport';
import authCtrl from './auth.ctrl';
import { checkToken } from '../../lib/token';

const auth = new Router();

auth.get('/sign', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtubepartner-channel-audit']
}));
auth.get('/callback', authCtrl.callback);
auth.get('/logout', checkToken, authCtrl.logout);
auth.get('/me', checkToken, authCtrl.getUser);
auth.get('/', checkToken, authCtrl.check);

module.exports = auth;