import axios from 'axios';

const playListAxios = axios.create({ withCredentials: false });

export const getPlayList = id => playListAxios.get(`http://localhost:3001/api/playlist/find/${id}`);
export const getAllPlayList = () => playListAxios.get('http://localhost:3001/api/playlist');

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
