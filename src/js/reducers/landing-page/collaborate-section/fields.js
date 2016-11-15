import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import { getField } from 'utils/draft';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'collaborate_header': getField(action.payload.fields, 'collaborate_header'),
    'collaborate_content': getField(action.payload.fields, 'collaborate_content')
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => (state)
}, {});

export default fields;
