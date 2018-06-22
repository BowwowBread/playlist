import youtubeApi from '../../lib/youtube';

const getPlayList = async (ctx) => {
  const { accessToken } = ctx.req.user;
  try {
    const playList = await youtubeApi.getPlayList(accessToken);
    console.log(playList);
    ctx.body = playList;
  } catch (e) {
    ctx.throw(e, 403);
  }
};

exports.getPlayList = getPlayList;
