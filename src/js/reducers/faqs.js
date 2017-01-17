import { handleActions } from 'redux-actions';
import { reduce, find } from 'lodash';

import {
  FAQS_REQUEST_SUCCESS, UPDATE_FAQ_REQUEST_SUCCESS, BULK_UPDATE_FAQS_SUCCESS
} from 'utils/constants';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


export default handleActions({
  [FAQS_REQUEST_SUCCESS]: (state, action) => (
    { ...state, ...reduce(action.payload.results, (result, value) => {
      result[value.id] = value;
      return result;
    }, {}) }
  ),
  [UPDATE_FAQ_REQUEST_SUCCESS]: (state, action) => {
    const updatedFAQ = state[action.payload.id];
    updatedFAQ.fields = action.payload.fields;
    return { ...state };
  },
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...reduce(
      find(action.payload.fields, ({ name }) => (name === 'faqs')).value,
      (result, report) => {
        result[report.id] = report;
        return result;
      },
      {}
    )
  }),
  [BULK_UPDATE_FAQS_SUCCESS]: (state, action) => (
    { ...state, ...reduce(action.payload, (result, value) => {
      result[value.id] = value;
      return result;
    }, {}) }
  )
}, {});
