import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const citySummary = handleActions({
  [constants.CITY_SUMMARY_REQUEST_START]: (state, action) => (state),
  [constants.CITY_SUMMARY_REQUEST_SUCCESS]: (state, action) => (action.payload),
  [constants.CITY_SUMMARY_REQUEST_FAILURE]: (state, action) => (state)
}, {});

export default citySummary;
