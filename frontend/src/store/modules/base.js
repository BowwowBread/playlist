import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const TOGGLE_MOBILE_SIDEBAR = 'base/TOGGLE_MOBILE_SIDEBAR';

export const toggleMobileSidebar = createAction(TOGGLE_MOBILE_SIDEBAR);

const initialState = Map({
  mobileSidebar: Map({
    visible: false,
  }),
});

export default handleActions({
  [TOGGLE_MOBILE_SIDEBAR]: (state, action) => {
    return state.setIn(['mobileSidebar', 'visible'], !state.getIn(['mobileSidebar', 'visible']));
  },
}, initialState);
