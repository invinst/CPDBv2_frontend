import { createAction } from 'redux-actions';

import { PINBOARD_PAGE_REDIRECT } from 'utils/constants';


export const redirect = createAction(PINBOARD_PAGE_REDIRECT);
