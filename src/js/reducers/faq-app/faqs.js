import { handleActions } from 'redux-actions';

import { FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE } from 'actions/faq-app';


const faqs = handleActions({
  [FAQS_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [FAQS_REQUEST_FAILURE]: (state, action) => (
    []
  )
}, []);

export default faqs;
