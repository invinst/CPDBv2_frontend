import { handleActions } from 'redux-actions';

import {
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE, SUGGESTION_REQUEST_CANCEL_MESSAGE
} from 'utils/constants';


export default handleActions({
  [SUGGESTION_REQUEST_START]: (state, action) => (true),
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => (false),
  [SUGGESTION_REQUEST_FAILURE]: (state, action) => action.payload.message === SUGGESTION_REQUEST_CANCEL_MESSAGE,
}, false);
