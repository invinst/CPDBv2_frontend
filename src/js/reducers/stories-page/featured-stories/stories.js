import { handleActions } from 'redux-actions';

import {
  FEATURED_STORIES_REQUEST_SUCCESS, FEATURED_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/featured-stories';
import { PAGINATION_DEFAULT } from 'utils/constants';


const stories = handleActions({
  [FEATURED_STORIES_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [FEATURED_STORIES_REQUEST_FAILURE]: (state, action) => (
    PAGINATION_DEFAULT
  )
}, PAGINATION_DEFAULT);

export default stories;
