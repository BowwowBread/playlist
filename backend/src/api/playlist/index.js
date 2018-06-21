import Router from 'koa-router';
import playListCtrl from './playList.ctrl';
import { checkToken } from '../../lib/token';
import { checkAccessToken } from '../../lib/auth';


const playList = new Router();

playList.get('/', checkToken, checkAccessToken, playListCtrl.getPlayList);

module.exports = playList;