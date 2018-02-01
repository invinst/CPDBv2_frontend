import { createAction } from 'redux-actions';
import { get } from 'actions/common/async-action';

import {
  SEARCH_TERMS_NAVIGATION_UP,
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERM_CATEGORIES_API_URL,
  SEARCH_TERMS_CATEGORIES_REQUEST_START,
  SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
  SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE,
  SEARCH_TERMS_NAVIGATION_RESET,
} from 'utils/constants';


export const requestSearchTermCategories = get(
  SEARCH_TERM_CATEGORIES_API_URL,
  [
    SEARCH_TERMS_CATEGORIES_REQUEST_START,
    SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
    SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE
  ]
);

export const move = (direction, totalItemCount) => {
  const DIRECTION_TO_ACTION = {
    'up': SEARCH_TERMS_NAVIGATION_UP,
    'down': SEARCH_TERMS_NAVIGATION_DOWN
  };

  return createAction(DIRECTION_TO_ACTION[direction])({ totalItemCount });
};

export const resetNavigation = createAction(SEARCH_TERMS_NAVIGATION_RESET);
