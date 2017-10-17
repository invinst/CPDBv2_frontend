import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const isRequesting = handleActions({
  [constants.OFFICER_SOCIAL_GRAPH_REQUEST_START]: (state, action) => (true),
  [constants.OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS]: (state, action) => (false),
  [constants.OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
