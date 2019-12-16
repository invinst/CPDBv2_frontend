import { handleActions } from 'redux-actions';

import {
  ADD_ITEM_TO_PINBOARD_STATE,
  REMOVE_ITEM_FROM_PINBOARD_STATE,
  ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE,
} from 'utils/constants';


export default handleActions({
  [ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE]: (state, action) => {
    return action.payload;
  },
  [ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => ({}),
  [REMOVE_ITEM_FROM_PINBOARD_STATE]: (state, action) => ({}),
}, {});
