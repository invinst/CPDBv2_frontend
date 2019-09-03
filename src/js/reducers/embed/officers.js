import { handleActions } from 'redux-actions';

import { EMBED_OFFICERS_REQUEST_SUCCESS } from 'utils/constants';


const officers = handleActions({
  [EMBED_OFFICERS_REQUEST_SUCCESS]: (state, action) => (action.payload),
}, []);

export default officers;
