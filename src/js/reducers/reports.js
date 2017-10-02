import { handleActions } from 'redux-actions';
import { reduce } from 'lodash';

import {
  REPORTS_REQUEST_SUCCESS, UPDATE_REPORT_REQUEST_SUCCESS,
  REPORT_REQUEST_SUCCESS
} from 'actions/reporting-page';


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
  [REPORT_REQUEST_SUCCESS]: (state, action) => (
    { ...state, ...reduce([action.payload], (result, value) => {
      result[value.id] = value;
      return result;
    }, {}) }
  )
}, {});
