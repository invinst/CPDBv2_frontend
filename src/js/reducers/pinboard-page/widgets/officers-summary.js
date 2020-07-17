import { handleActions } from 'redux-actions';

import {
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


export default handleActions({
  [PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START]: (state, action) => ({}),
  [PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE]: (state, action) => ({}),
}, {});
