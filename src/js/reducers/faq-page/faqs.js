import { handleActions } from 'redux-actions';

import { FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE } from 'actions/faq-page';

import { PAGINATION_DEFAULT } from 'utils/constants';


const faqs = handleActions({
  [FAQ_PAGE_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [FAQ_PAGE_REQUEST_FAILURE]: (state, action) => (
    PAGINATION_DEFAULT
  )
}, PAGINATION_DEFAULT);

export default faqs;
