import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


const heroSection = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    complaintsText: action.payload['hero_complaints_text'] || '',
    useOfForceText: action.payload['hero_use_of_force_text'] || ''
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => ({})
}, {});

export default heroSection;
