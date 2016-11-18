import { handleActions } from 'redux-actions';

import {
  REPORTS_REQUEST_SUCCESS, REPORTS_REQUEST_FAILURE
} from 'actions/reporting-page';


const pagination = handleActions({
  [REPORTS_REQUEST_SUCCESS]: (state, {
    payload: { next, previous, count }
  }) => ({ next, previous, count }),
  [REPORTS_REQUEST_FAILURE]: (state, action) => (
    { next: null, previous: null, count: 0 }
  )
}, { next: null, previous: null, count: 0 });

export default pagination;
