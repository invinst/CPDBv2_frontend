import { handleActions } from 'redux-actions';

import { SUGGESTION_REQUEST_START, SELECT_TAG } from 'actions/search-page';


export default handleActions({
  [SUGGESTION_REQUEST_START]: (state, action) => (
    action.payload.request.params && action.payload.request.params.contentType || null
  ),
  [SELECT_TAG]: (state, action) => (
    action.payload
  )
}, null);
