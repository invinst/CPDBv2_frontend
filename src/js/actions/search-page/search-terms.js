import { createAction } from 'redux-actions';

import * as constants from 'utils/constants';
import { get } from 'actions/common/async-action';

export const requestSearchTermCategories = get(
  constants.SEARCH_TERM_CATEGORIES_API_URL,
  [
    constants.SEARCH_TERM_CATEGORIES_REQUEST_START,
    constants.SEARCH_TERM_CATEGORIES_REQUEST_SUCCESS,
    constants.SEARCH_TERM_CATEGORIES_REQUEST_FAILURE
  ]
);

export const selectCategory = createAction(constants.SELECT_CATEGORY);
