import reqeust from 'request-promise';

const getPlayList = async (ctx) => {
  const { accessToken } = ctx.req.user;
  const options = {
    method: 'GET',
    uri: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',
    headers: {
      Authorization: `Bearer ${ accessToken }`
    }
  };
  const playList = reqeust(options);
  ctx.body = playList;
};

exports.getPlayList = getPlayList;