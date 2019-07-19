import { createAction } from 'redux-actions';

import {
  PINBOARD_PAGE_REDIRECT,
  PINBOARD_PAGE_FOCUS_ITEM,
  UPDATE_PINBOARD_TIMELINE_IDX,
  UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
  ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE,
} from 'utils/constants';


export const redirect = createAction(PINBOARD_PAGE_REDIRECT);

export const focusItem = createAction(PINBOARD_PAGE_FOCUS_ITEM);

export const updatePinboardTimelineIdx = createAction(UPDATE_PINBOARD_TIMELINE_IDX);

export const updatePinboardRefreshIntervalId = createAction(UPDATE_PINBOARD_REFRESH_INTERVAL_ID);

export const addOrRemoveItemInPinboardFromPreviewPane = createAction(ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE);
