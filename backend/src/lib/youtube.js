import request from 'request-promise';
import axios from 'axios';

const getPlayList = async (accessToken) => {
  const options = {
    method: 'GET',
    uri: 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',
    headers: {
      Authorization: `Bearer ${ accessToken }`
    }
  };
  try {
    const playList = await request(options);
    console.log(playList);
    return playList;
  } catch (e) {
    console.log(e);
    return JSON.parse(e.response.body).error.message;
  }
};

exports.getPlayList = getPlayList;