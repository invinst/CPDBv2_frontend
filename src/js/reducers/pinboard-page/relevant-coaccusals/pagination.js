import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const pagination = handleActions({
  [constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS]: (state, {
    payload: { next, previous }
  }) => ({ next, previous }),
  [constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE]: (state, action) => (
    { next: null, previous: null }
  )
}, { next: null, previous: null });

export default pagination;
