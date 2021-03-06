import request from 'request-promise';

const getPlayList = async (accessToken) => {
  const options = {
    method: 'GET',
    uri: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',
    headers: {
      Authorization: `Bearer ${ accessToken }`
    },
    json: true
  };
  try {
    const playList = await request(options);
    return playList;
  } catch (e) {
    return JSON.parse(e.response.body).error.message;
  }
};

exports.getPlayList = getPlayList;