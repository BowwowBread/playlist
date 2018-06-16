import Router from 'koa-router';
import passport from 'koa-passport';
import authCtrl from './auth.ctrl';

const auth = new Router();

auth.get('/sign', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
}));
auth.get('/callback', authCtrl.callback);
auth.get('/logout', authCtrl.logout);
auth.get('/', authCtrl.check);

module.exports = auth;