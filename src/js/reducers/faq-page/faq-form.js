import { handleActions } from 'redux-actions';

import { FAQ_PAGE_POST_START, FAQ_PAGE_POST_SUCCESS, FAQ_PAGE_POST_FAILURE } from 'actions/faq-page';


export default handleActions({
  [FAQ_PAGE_POST_START]: (state, action) => ({ isSubmitting: true }),
  [FAQ_PAGE_POST_SUCCESS]: (state, action) => ({
    isSubmitting: false,
    data: action.payload
  }),
  [FAQ_PAGE_POST_FAILURE]: (state, action) => ({
    isSubmitting: false,
    error: action.payload
  })
}, {
  isSubmitting: false
});
