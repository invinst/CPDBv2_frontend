import { handleActions } from 'redux-actions';

import { FAQS_POST_START, FAQS_POST_SUCCESS, FAQS_POST_FAILURE } from 'actions/faq-page';


export default handleActions({
  [FAQS_POST_START]: (state, action) => ({ isSubmitting: true }),
  [FAQS_POST_SUCCESS]: (state, action) => ({
    isSubmitting: false,
    data: action.payload
  }),
  [FAQS_POST_FAILURE]: (state, action) => ({
    isSubmitting: false,
    error: action.payload
  })
}, {
  isSubmitting: false
});
