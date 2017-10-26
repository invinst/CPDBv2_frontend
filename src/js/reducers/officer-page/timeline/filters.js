/* global location */
import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_CHANGE_FILTERS
} from 'utils/constants';

const allowedFilters = [
  'category',
  'race',
  'gender',
  'age',
];

export default handleActions({
  [OFFICER_TIMELINE_CHANGE_FILTERS]: (state, action) => {
    const newFilters = {};
    const params = action.payload;

    allowedFilters.forEach(allowedFilter => {
      if (params[allowedFilter]) {
        newFilters[allowedFilter] = params[allowedFilter];
      }
    });
    return newFilters;
  },
}, {});
