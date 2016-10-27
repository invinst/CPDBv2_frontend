import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { getField } from 'utils/draft';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'vftg_content': getField(action.payload.fields, 'vftg_content'),
    'vftg_link': getField(action.payload.fields, 'vftg_link'),
    'vftg_date': getField(action.payload.fields, 'vftg_date')
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => (state)
}, {});

export default fields;
