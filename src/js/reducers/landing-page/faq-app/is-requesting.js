import { handleActions } from 'redux-actions';

import { FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE } from 'actions/landing-page/faq-app';


const isRequesting = handleActions({
  [FAQS_REQUEST_START]: (state, action) => (true),
  [FAQS_REQUEST_SUCCESS]: (state, action) => (false),
  [FAQS_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
