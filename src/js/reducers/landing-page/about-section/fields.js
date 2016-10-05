import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'about_header': action.payload['about_header'] || null,
    'about_content': action.payload['about_content'] || null
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => ({})
}, {});

export default fields;
