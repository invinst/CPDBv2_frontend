import { handleActions } from 'redux-actions';

import {
  COMMUNITY_REQUEST_START,
  COMMUNITY_REQUEST_SUCCESS,
  COMMUNITY_REQUEST_FAILURE,
} from 'utils/constants';


export default handleActions({
  [COMMUNITY_REQUEST_START]: (state, action) => false,
  [COMMUNITY_REQUEST_SUCCESS]: (state, action) => true,
  [COMMUNITY_REQUEST_FAILURE]: (state, action) => true,
}, false);
