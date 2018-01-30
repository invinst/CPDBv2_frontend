import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const communities = handleActions({
  [constants.COMMUNITY_REQUEST_START]: (state, action) => (state),
  [constants.COMMUNITY_REQUEST_SUCCESS]: (state, action) => (action.payload),
  [constants.COMMUNITY_REQUEST_FAILURE]: (state, action) => (state)
}, null);

export default communities;
