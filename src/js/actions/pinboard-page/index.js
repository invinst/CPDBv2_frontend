import { createAction } from 'redux-actions';

import {
  PINBOARD_PAGE_FOCUS_ITEM,
  UPDATE_PINBOARD_TIMELINE_IDX,
  UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
  ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE,
  PINBOARD_EDIT_MODE,
  PINBOARD_EDIT_TYPES,
  HIDE_SHOW_PINBOARDS_LIST,
  PINBOARDS_FETCH_REQUEST_START,
  PINBOARDS_FETCH_REQUEST_SUCCESS,
  PINBOARDS_FETCH_REQUEST_FAILURE,
} from 'utils/constants';
import { createChangeEditModeAction } from 'actions/cms';
import * as constants from 'utils/constants';
import { get } from 'actions/common/async-action';


export const focusItem = createAction(PINBOARD_PAGE_FOCUS_ITEM);

export const updatePinboardTimelineIdx = createAction(UPDATE_PINBOARD_TIMELINE_IDX);

export const updatePinboardRefreshIntervalId = createAction(UPDATE_PINBOARD_REFRESH_INTERVAL_ID);

export const addOrRemoveItemInPinboardFromPreviewPane = createAction(ADD_OR_REMOVE_ITEM_IN_PINBOARD_FROM_PREVIEW_PANE);

export const turnOnEmptyPinboardTitleEditMode = createChangeEditModeAction(PINBOARD_EDIT_MODE)(
  PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE, true
);

export const turnOffEmptyPinboardTitleEditMode = createChangeEditModeAction(PINBOARD_EDIT_MODE)(
  PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE, false
);

export const turnOnEmptyPinboardDescriptionEditMode = createChangeEditModeAction(PINBOARD_EDIT_MODE)(
  PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION, true
);

export const turnOffEmptyPinboardDescriptionEditMode = createChangeEditModeAction(PINBOARD_EDIT_MODE)(
  PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION, false
);

export const fetchPinboards = (params) => get(
  constants.PINBOARDS_URL,
  [
    PINBOARDS_FETCH_REQUEST_START,
    PINBOARDS_FETCH_REQUEST_SUCCESS,
    PINBOARDS_FETCH_REQUEST_FAILURE,
  ]
)(params);

const hideShowPinboardsList = createAction(HIDE_SHOW_PINBOARDS_LIST);
export const showPinboardsList = () => hideShowPinboardsList(true);
export const hidePinboardList = () => hideShowPinboardsList(false);
