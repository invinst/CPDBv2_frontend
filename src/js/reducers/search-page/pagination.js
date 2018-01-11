import { handleActions } from 'redux-actions';

import { SUGGESTION_SINGLE_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [SUGGESTION_SINGLE_REQUEST_SUCCESS]: (state, { payload: { next } }) => ({ next })
}, {});
