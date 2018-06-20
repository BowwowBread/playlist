import axios from 'axios';

const authAxios = axios.create({ withCredentials: false });

export const getUser = token => authAxios.get('http://localhost:3001/api/auth/me', {
  headers: {
    Authorization: token,
  },
});

export const check = token => authAxios.get('http://localhost:3001/api/auth', {
  headers: {
    Authorization: token,
  },
});

export const logout = token => authAxios.get('http://localhost:3001/api/auth/logout', {
  headers: {
    Authorization: token,
  },
});
