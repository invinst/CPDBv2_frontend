import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { getContentStateFromFields } from 'utils/draft';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'vftg_content': getContentStateFromFields(action.payload.fields, 'vftg_content'),
    'vftg_link': getContentStateFromFields(action.payload.fields, 'vftg_link'),
    'vftg_date': getContentStateFromFields(action.payload.fields, 'vftg_date')
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => (state)
}, {});

export default fields;
