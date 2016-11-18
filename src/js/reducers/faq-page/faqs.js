import { handleActions } from 'redux-actions';

import { FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE } from 'actions/faq-page';

import { PAGINATION_DEFAULT } from 'utils/constants';


const faqs = handleActions({
  [FAQS_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [FAQS_REQUEST_FAILURE]: (state, action) => (
    PAGINATION_DEFAULT
  )
}, PAGINATION_DEFAULT);

export default faqs;
