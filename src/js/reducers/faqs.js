import { handleActions } from 'redux-actions';
import { reduce } from 'lodash';

import {
  FAQS_REQUEST_SUCCESS, UPDATE_FAQ_REQUEST_SUCCESS, BULK_UPDATE_FAQS_SUCCESS
} from 'utils/constants';


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
  [BULK_UPDATE_FAQS_SUCCESS]: (state, action) => (
    { ...state, ...reduce(action.payload, (result, value) => {
      result[value.id] = value;
      return result;
    }, {}) }
  )
}, {});
