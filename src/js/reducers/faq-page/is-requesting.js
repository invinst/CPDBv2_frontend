import { handleActions } from 'redux-actions';

import { FAQ_PAGE_REQUEST_START, FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE } from 'actions/faq-page';


const isRequesting = handleActions({
  [FAQ_PAGE_REQUEST_START]: (state, action) => (true),
  [FAQ_PAGE_REQUEST_SUCCESS]: (state, action) => (false),
  [FAQ_PAGE_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
