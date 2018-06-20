import axios from 'axios';

const youtubeAxios = axios.create({ withCredentials: false });

export const getPlayList = accessToken => youtubeAxios.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true', {
  headers: {
    Authorization: 'Bearer ' + accessToken,
  },
});
