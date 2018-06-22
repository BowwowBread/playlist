import { createAction, handleActions } from 'redux-actions';
import { Map, toJS, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';
import * as playListApi from 'lib/api/playList';


const GET_MY_PLAYLIST = 'list/GET_MY_PLAYLIST';

export const getMyPlayList = createAction(GET_MY_PLAYLIST, playListApi.getMyPlayList);

const initialState = Map({
  myPlayList: List([
    Map({
      id: '',
      channelId: '',
      channelTitle: '',
      description: '',
      date: '',
      title: '',
      thumbnail: '',
    }),
  ]),
});

export default handleActions({
  ...pender({
    type: GET_MY_PLAYLIST,
    onSuccess: (state, action) => {
      const { data } = action.payload;
      const playList = List(data.items.map((item, i) => {
        const { id } = item;
        const {
          channelId, channelTitle, description, publishedAt: date, title,
        } = item.snippet;
        const { url: thumbnail } = item.snippet.thumbnails.default;
        return Map({
          id,
          channelId,
          channelTitle,
          description,
          date,
          title,
          thumbnail,
        });
      }));
      return state.set('myPlayList', playList);
    },
  }),
}, initialState);
