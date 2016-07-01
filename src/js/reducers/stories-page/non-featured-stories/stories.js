import { handleActions } from 'redux-actions';

import {
  NON_FEATURED_STORIES_REQUEST_SUCCESS, NON_FEATURED_STORIES_REQUEST_FAILURE,
  LOAD_MORE_STORIES_REQUEST_SUCCESS, LOAD_MORE_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';
import { PAGINATION_DEFAULT } from 'utils/constants';


const stories = handleActions({
  [NON_FEATURED_STORIES_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [NON_FEATURED_STORIES_REQUEST_FAILURE]: (state, action) => (
    PAGINATION_DEFAULT
  ),
  [LOAD_MORE_STORIES_REQUEST_SUCCESS]: (state, action) => ({
    count: action.payload.count,
    next: action.payload.next,
    previous: action.payload.previous,
    results: state.results.concat(action.payload.results)
  }),
  [LOAD_MORE_STORIES_REQUEST_FAILURE]: (state, action) => (
    state
  )
}, PAGINATION_DEFAULT);

export default stories;
