import axios from 'axios';

const playListAxios = axios.create({ withCredentials: false });
export const getAllPlayList = token => playListAxios.get('http://localhost:3001/api/playlist', {
  headers: {
    Authorization: token,
  },
});

export const getMyPlayList = token => playListAxios.get('http://localhost:3001/api/playlist/me', {
  headers: {
    Authorization: token,
  },
});

export const sharePlayList = async (token, playList, selectCategory) => {
  return playListAxios.post('http://localhost:3001/api/playlist/share', {
    playList,
    selectCategory,
  }, {
    headers: {
      Authorization: token,
    },
  });
};
