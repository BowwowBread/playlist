import axios from 'axios';

const playListAxios = axios.create({ withCredentials: false });

export const getPlayList = async token => playListAxios.get('http://localhost:3001/api/playlist', {
  headers: {
    Authorization: token,
  },
});
