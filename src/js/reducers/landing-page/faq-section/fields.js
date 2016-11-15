import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { getField } from 'utils/draft';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'faq_randomizer': getField(action.payload.fields, 'faq_randomizer'),
    'faq_header': getField(action.payload.fields, 'faq_header')
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => (state)
}, {});

export default fields;
