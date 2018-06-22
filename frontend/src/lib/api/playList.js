import axios from 'axios';

const playListAxios = axios.create({ withCredentials: false });

export const getMyPlayList = async token => playListAxios.get('http://localhost:3001/api/playlist/me', {
  headers: {
    Authorization: token,
  },
});

