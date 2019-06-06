import { createAction } from 'redux-actions';

import {
  PINBOARD_PAGE_INITIAL_LOADING,
  PINBOARD_PAGE_REDIRECT,
  PINBOARD_PAGE_FOCUS_ITEM
} from 'utils/constants';


export const initialLoading = createAction(PINBOARD_PAGE_INITIAL_LOADING);

export const redirect = createAction(PINBOARD_PAGE_REDIRECT);

export const focusItem = createAction(PINBOARD_PAGE_FOCUS_ITEM);
