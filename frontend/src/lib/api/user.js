import axios from 'axios';

const userAxios = axios.create({ withCredentials: false });

export const getUser = token => userAxios.get('http://localhost:3001/api/user/me', {
  headers: {
    Authorization: token,
  },
});
