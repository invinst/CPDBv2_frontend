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
  [constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    crItems: action.payload,
  }),
  [constants.PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    officerItems: action.payload,
  }),
  [constants.PINBOARD_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    trrItems: action.payload,
  }),
  [constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ...state,
    isPinboardRestored: true,
  }),
}, null);
