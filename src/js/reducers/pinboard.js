import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [constants.PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ...state,
    isPinboardRestored: true,
  }),
}, null);
