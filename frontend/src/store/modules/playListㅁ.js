import { createAction, handleActions } from 'redux-actions';
import { Map, toJS, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';
import * as playListApi from 'lib/api/playList';

const GET_ALL_PLAYLIST = 'list/GET_ALL_PLAYLIST';
const GET_MY_PLAYLIST = 'list/GET_MY_PLAYLIST';
const SET_CATEGORY_PLAYLIST = 'list/SET_CATEGORY_PLAYLIST';
const SHARE_PLAYLIST = 'list/SHARE_PLAYLIST';
const SET_PLAYER = 'list/SET_PLAYER';

export const getAllPlayList = createAction(GET_ALL_PLAYLIST, playListApi.getAllPlayList);
export const getMyPlayList = createAction(GET_MY_PLAYLIST, playListApi.getMyPlayList);
export const setCategoryPlayList = createAction(SET_CATEGORY_PLAYLIST);
export const sharePlayList = createAction(SHARE_PLAYLIST, playListApi.sharePlayList);
export const setPlayer = createAction(SET_PLAYER);

const initialState = Map({
  playLists: List([Map({
    id: '',
    channelId: '',
    channelTitle: '',
    description: '',
    date: '',
    title: '',
    thumbnail: '',
    shared: false,
    category: [],
  })]),
  myPlayList: List([Map({
    id: '',
    channelId: '',
    channelTitle: '',
    description: '',
    date: '',
    title: '',
    thumbnail: '',
    shared: false,
    category: [],
  })]),
  categoryPlayList: Map({
    playLists: List([Map({
      id: '',
      channelId: '',
      channelTitle: '',
      description: '',
      date: '',
      title: '',
      thumbnail: '',
      shared: false,
      category: [],
    })]),
    category: '',
  }),
  playerInfo: Map({
    id: '',
    channelId: '',
    channelTitle: '',
    description: '',
    date: '',
    title: '',
    thumbnail: '',
    shared: false,
    category: [],
  }),
});

export default handleActions({
  [SET_PLAYER]: (state, action) => {
    const {
      id,
      channelId,
      channelTitle,
      description,
      date,
      title,
      thumbnail,
      shared,
      category,
    } = action.payload;
    const playeInfo = Map({
      id,
      channelId,
      channelTitle,
      description,
      date,
      title,
      thumbnail,
      shared,
      category,
    });
    return state.set('playerInfo', playeInfo);
  },
  ...pender({
    type: GET_ALL_PLAYLIST,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      const playList = List(data.map((item, i) => {
        const {
          id,
          channelId,
          channelTitle,
          description,
          date,
          title,
          thumbnail,
          shared,
          category,
        } = item;
        return Map({
          id,
          channelId,
          channelTitle,
          description,
          date,
          title,
          thumbnail,
          shared,
          category,
        });
      }));
      return state.set('playLists', playList);
    },
  }),
  ...pender({
    type: GET_MY_PLAYLIST,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      const playList = List(data.map((item, i) => {
        const {
          id,
          channelId,
          channelTitle,
          description,
          date,
          title,
          thumbnail,
          shared,
          category,
        } = item;
        return Map({
          id,
          channelId,
          channelTitle,
          description,
          date,
          title,
          thumbnail,
          shared,
          category,
        });
      }));
      return state.set('myPlayList', playList);
    },
  }),
  [SET_CATEGORY_PLAYLIST]: (state, action) => {
    const category = action.payload;
    const matchPlayList = List(state.get('playLists').filter((item) => {
      return item.get('category').includes(category);
    }));
    return state.setIn(['categoryPlayList', 'playLists'], matchPlayList).setIn(['categoryPlayList', 'category'], category);
  },
  ...pender({
    type: SHARE_PLAYLIST,
    onSuccess: (state, action) => {
      const {
        id,
        channelId,
        channelTitle,
        description,
        date,
        title,
        thumbnail,
        shared,
        category,
      } = action.payload.data;
      const updatePlayList = Map({
        id,
        channelId,
        channelTitle,
        description,
        date,
        title,
        thumbnail,
        shared,
        category,
      });
      const index = state
        .get('myPlayList')
        .findIndex(i => i.get('id') === updatePlayList.get('id'));
      return state.set('myPlayList', state.get('myPlayList').set(index, updatePlayList));
    },
  }),
}, initialState);
