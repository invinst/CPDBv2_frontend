import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const isRequesting = handleActions({
  [constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_START]: (state, action) => (true),
  [constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS]: (state, action) => (false),
  [constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE]: (state, action) => (false),
}, false);

export default isRequesting;
