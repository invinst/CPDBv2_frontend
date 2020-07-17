import { handleActions } from 'redux-actions';

import {
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


export default handleActions({
  [PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START]: (state, action) => [],
  [PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE]: (state, action) => [],
}, []);
