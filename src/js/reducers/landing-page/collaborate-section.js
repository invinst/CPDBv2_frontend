import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


const vftgSection = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    headerText: action.payload['collaborate_header'] || '',
    body: action.payload['collaborate_content'] || {}
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => ({})
}, {});

export default vftgSection;
