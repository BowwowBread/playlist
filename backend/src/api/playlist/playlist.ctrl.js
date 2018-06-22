import youtubeApi from '../../lib/youtube';
import PlayList from '../../models/PlayList';

const getAllPlayList = async (ctx) => {
  const PlayLists = await PlayList.findAll();
  console.log(PlayLists);

  ctx.body = PlayLists;
};

const getMyPlayList = async (ctx) => {
  const { accessToken } = ctx.req.user;
  try {
    const playList = await youtubeApi.getPlayList(accessToken);
    ctx.body = playList;
  } catch (e) {
    ctx.throw(e, 403);
  }
};

const uploadPlayList = async (ctx) => {
  console.log(ctx.req.body);

  ctx.status = 200;
}

exports.getMyPlayList = getMyPlayList;
exports.getAllPlayList = getAllPlayList;