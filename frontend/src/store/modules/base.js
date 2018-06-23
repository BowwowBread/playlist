import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const TOGGLE_SIDEBAR = 'base/TOGGLE_SIDEBAR';
const TOGGLE_PLAYER = 'base/TOGGLE_PLAYER';

export const toggleSidebar = createAction(TOGGLE_SIDEBAR);
export const togglePlayer = createAction(TOGGLE_PLAYER);


const initialState = Map({
  isSidebarOpen: false,
  isPlayerOpen: false,
});

export default handleActions({
  [TOGGLE_SIDEBAR]: (state, action) => {
    return state.set('isSidebarOpen', !state.get('isSidebarOpen'));
  },
  [TOGGLE_PLAYER]: (state, action) => {
    return state.set('isPlayerOpen', !state.get('isPlayerOpen'));
  },
}, initialState);
