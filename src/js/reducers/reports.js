import { handleActions } from 'redux-actions';
import { reduce, find } from 'lodash';

import {
  REPORTS_REQUEST_SUCCESS, UPDATE_REPORT_REQUEST_SUCCESS
} from 'actions/reporting-page';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


export default handleActions({
  [REPORTS_REQUEST_SUCCESS]: (state, action) => (
    { ...state, ...reduce(action.payload.results, (result, value) => {
      result[value.id] = value;
      return result;
    }, {}) }
  ),
  [UPDATE_REPORT_REQUEST_SUCCESS]: (state, action) => {
    const updatedReport = state[action.payload.id];
    updatedReport.fields = action.payload.fields;
    return { ...state };
  },
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...reduce(
      find(action.payload.fields, ({ name }) => (name === 'reports')).value,
      (result, report) => {
        result[report.id] = report;
        return result;
      },
      {}
    )
  })
}, {});
