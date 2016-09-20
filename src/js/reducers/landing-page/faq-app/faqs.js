import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


const faqs = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => (
    action.payload.faqs || []
  ),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => (
    []
  )
}, []);

export default faqs;
