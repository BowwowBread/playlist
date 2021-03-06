import Router from 'koa-router';
import playListCtrl from './playList.ctrl';
import { checkToken } from '../../lib/token';
import { checkAccessToken } from '../../lib/auth';


const playList = new Router();

playList.get('/', playListCtrl.getAllPlayList);
playList.get('/find/:id', playListCtrl.getPlayList);
playList.get('/me', checkToken, checkAccessToken, playListCtrl.getMyPlayList);
playList.post('/share', checkToken, playListCtrl.sharePlayList);

module.exports = playList;