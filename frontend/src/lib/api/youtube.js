import axios from 'axios';

const youtubeAxios = axios.create({ withCredentials: false });

const token = 'ya29.GlvdBStTl8E4LU-UNTsk0TaVL2iM34lBTzxin_aZl_0sJdNq1j7hzJnpsyIvfzYxD4_k3C9pRxw1_JsdkkDb9tulV9vHLb_B44taSWWP_O0Vgf-Bl42tdJsofnk7';
const Auth = 'Bearer '.concat(token);

export const test = () => youtubeAxios.get('https://www.googleapis.com/youtube/v3/channels?part=id&mine=true', {
  headers: {
    Authorization: Auth,
  },
});

export const getPlaylist = () => youtubeAxios.get('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true', {
  headers: {
    Authorization: Auth,
  },
});
