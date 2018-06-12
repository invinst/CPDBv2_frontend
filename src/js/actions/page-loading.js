import { createAction } from 'redux-actions';

import * as constants from 'utils/constants';

export const pageLoadStart = createAction(constants.PAGE_LOAD_START);
export const pageLoadFinish = createAction(constants.PAGE_LOAD_FINISH);
