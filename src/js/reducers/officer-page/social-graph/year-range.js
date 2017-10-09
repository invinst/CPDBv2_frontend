import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

const defaultValue = [1984, new Date().getYear() + 1900];

const yearRange = handleActions({
  [constants.OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE]: (state, action) => action.payload,
  [constants.CHANGE_OFFICER_ID]: () => defaultValue
}, defaultValue);

export default yearRange;
