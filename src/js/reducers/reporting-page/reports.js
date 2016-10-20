import { handleActions } from 'redux-actions';

import {
  REPORTS_REQUEST_SUCCESS
} from 'actions/reporting-page';


export default handleActions({
  [REPORTS_REQUEST_SUCCESS]: (state, action) => (
    [...state, ...action.payload.results.map(report => report.id)]
  )
}, []);
