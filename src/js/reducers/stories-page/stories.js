import { handleActions } from 'redux-actions';

import { STORIES_PAGE_REQUEST_SUCCESS, STORIES_PAGE_REQUEST_FAILURE } from 'actions/stories-page';
import { PAGINATION_DEFAULT } from 'utils/constants';


const faqs = handleActions({
  [STORIES_PAGE_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [STORIES_PAGE_REQUEST_FAILURE]: (state, action) => (
    PAGINATION_DEFAULT
  )
}, PAGINATION_DEFAULT);

export default faqs;
