import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const pagination = handleActions({
  [constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_SUCCESS]: (state, {
    payload: { next, previous }
  }) => ({ next, previous }),
  [constants.RELATED_COMPLAINTS_BY_CATEGORY_REQUEST_FAILURE]: (state, action) => (
    { next: null, previous: null }
  )
}, { next: null, previous: null });

export default pagination;
