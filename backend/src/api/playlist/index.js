import Router from 'koa-router';
import playlistCtrl from './playlist.ctrl';

const playlist = new Router();

playlist.get('/');

module.exports = playlist;