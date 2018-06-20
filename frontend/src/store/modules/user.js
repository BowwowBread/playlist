import { createAction, handleActions } from 'redux-actions';
import { Map, toJS, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as userApi from 'lib/api/user';

const GET_USER = 'user/GET_USER';
const LOGOUT = 'user/LOGOUT';

export const getUser = createAction(GET_USER, userApi.getUser);
export const logout = createAction(LOGOUT, userApi.logout);

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
