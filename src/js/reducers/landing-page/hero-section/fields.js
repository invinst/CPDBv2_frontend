import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { getField } from 'utils/draft';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'hero_title': getField(action.payload.fields, 'hero_title'),
    'hero_complaint_text': getField(action.payload.fields, 'hero_complaint_text'),
    'hero_use_of_force_text': getField(action.payload.fields, 'hero_use_of_force_text')
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => (state)
}, {});

export default fields;
