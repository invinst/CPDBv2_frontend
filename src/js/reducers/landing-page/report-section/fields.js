import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';
import { getContentStateFromFields } from 'utils/draft';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'reporting_randomizer': getContentStateFromFields(action.payload.fields, 'reporting_randomizer'),
    'reporting_header': getContentStateFromFields(action.payload.fields, 'reporting_header')
  })
}, {});

export default fields;
