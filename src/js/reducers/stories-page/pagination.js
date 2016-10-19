import { handleActions } from 'redux-actions';

import {
  STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE,
  LOAD_MORE_STORIES_REQUEST_SUCCESS
} from 'actions/stories-page';


const pagination = handleActions({
  [STORIES_REQUEST_SUCCESS]: (state, {
    payload: { next, previous, count }
  }) => ({ next, previous, count }),
  [STORIES_REQUEST_FAILURE]: (state, action) => (
    { next: null, previous: null, count: 0 }
  ),
  [LOAD_MORE_STORIES_REQUEST_SUCCESS]: (state, {
    payload: { next, previous, count }
  }) => ({ next, previous, count })
}, { next: null, previous: null, count: 0 });

export default pagination;
