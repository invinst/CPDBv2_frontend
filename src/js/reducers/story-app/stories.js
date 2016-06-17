import { handleActions } from 'redux-actions';

import { STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';
import { PAGINATION_DEFAULT } from 'utils/constants';


const stories = handleActions({
  [STORIES_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [STORIES_REQUEST_FAILURE]: (state, action) => (
    PAGINATION_DEFAULT
  )
}, PAGINATION_DEFAULT);

export default stories;
