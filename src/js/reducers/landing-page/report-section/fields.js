import { handleActions } from 'redux-actions';

import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';
import { getField } from 'utils/draft';


const fields = handleActions({
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    'reporting_randomizer': getField(action.payload.fields, 'reporting_randomizer'),
    'reporting_header': getField(action.payload.fields, 'reporting_header')
  })
}, {});

export default fields;
