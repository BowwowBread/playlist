import { createAction, handleActions } from 'redux-actions';
import { Map, toJS, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';
import * as youtubeApi from 'lib/api/youtube';

const FETCH_MY_PLAYLIST = 'list/FETCH_MY_PLAYLIST';

export const fetchMyPlayList = createAction(FETCH_MY_PLAYLIST, youtubeApi.getPlayList);

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
    type: FETCH_MY_PLAYLIST,
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