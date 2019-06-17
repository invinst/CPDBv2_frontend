import { createAction } from 'redux-actions';

import {
  PINBOARD_PAGE_REDIRECT,
  UPDATE_PINBOARD_TIMELINE_IDX,
  UPDATE_PINBOARD_REFRESH_INTERVAL_ID
} from 'utils/constants';


export const redirect = createAction(PINBOARD_PAGE_REDIRECT);

export const updatePinboardTimelineIdx = createAction(UPDATE_PINBOARD_TIMELINE_IDX);

export const updatePinboardRefreshIntervalId = createAction(UPDATE_PINBOARD_REFRESH_INTERVAL_ID);
