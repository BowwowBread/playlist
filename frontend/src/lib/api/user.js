import axios from 'axios';

const userAxios = axios.create({ withCredentials: false });

export const getUser = token => userAxios.get('http://localhost:3001/api/user/me', {
  headers: {
    Authorization: token,
  },
});

export const check = token => userAxios.get('http://localhost:3001/api/user', {
  headers: {
    Authorization: token,
  },
});

export const logout = token => userAxios.get('http://localhost:3001/api/user/logout', {
  headers: {
    Authorization: token,
  },
});
