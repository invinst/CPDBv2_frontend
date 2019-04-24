import { createAction } from 'redux-actions';

import { PINBOARD_PAGE_INITIAL_LOADING, PINBOARD_PAGE_REDIRECT } from 'utils/constants';


export const initialLoading = createAction(PINBOARD_PAGE_INITIAL_LOADING);

export const redirect = createAction(PINBOARD_PAGE_REDIRECT);
