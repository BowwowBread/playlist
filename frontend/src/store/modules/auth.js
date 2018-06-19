import { createAction, handleActions } from 'redux-actions';
import { Map, toJS, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as authApi from 'lib/api/auth';

const GET_USER = 'auth/GET_USER';
const LOGOUT = 'auth/LOGOUT';

export const getUser = createAction(GET_USER, authApi.getUser);
export const logout = createAction(LOGOUT, authApi.logout);

const initialState = Map({
  userInfo: Map({
    name: '', email: '', photo: '',
  }),
  isLogin: false,
});

export default handleActions({
  ...pender({
    type: GET_USER,
    onSuccess: (state, action) => {
      const {
        name, email, photo,
      } = action.payload.data;
      const userInfo = Map({
        name,
        email,
        photo,
      });
      return state
        .set('userInfo', userInfo)
        .set('isLogin', true);
    },
  }),
  ...pender({
    type: LOGOUT,
    onSuccess: (state, action) => {
      return state
        .set('userInfo', initialState.get('userInfo'))
        .set('isLogin', initialState.get('isLogin'));
    },
  }),
}, initialState);
