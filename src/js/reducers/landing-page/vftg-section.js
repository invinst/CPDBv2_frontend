import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


const vftgSection = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    headerText: action.payload['vftg_header'] || '',
    date: action.payload['vftg_date'] || '',
    contentText: action.payload['vftg_content'] || '',
    contentLink: action.payload['vftg_link'] || ''
  }),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => ({})
}, {});

export default vftgSection;
