import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'collaborate_header': action.payload['collaborate_header'] || null,
    'collaborate_content': action.payload['collaborate_content'] || null
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => ({})
}, {});

export default fields;
