import { handleActions } from 'redux-actions';

import {
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


export default handleActions({
  [PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START]: (state, action) => [],
  [PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE]: (state, action) => [],
}, []);
