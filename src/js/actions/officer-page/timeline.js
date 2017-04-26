import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';

import {
  OFFICER_URL, OFFICER_TIMELINE_MINIMAP_REQUEST_START, OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
  OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE, OFFICER_TIMELINE_FLIP_SORT_ORDER, OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS, OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE, OFFICER_TIMELINE_SELECT_MINIMAP_ITEM,
  DO_NOTHING_ACTION, OFFICER_TIMELINE_HOVER_MINIMAP_ITEM
} from 'utils/constants';


export const fetchMinimap = offficerId => (get(
  `${OFFICER_URL}${offficerId}/timeline-minimap/`,
  [OFFICER_TIMELINE_MINIMAP_REQUEST_START,
   OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
   OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE]
)());

export const fetchTimelineItems = offficerId => get(
  `${OFFICER_URL}${offficerId}/timeline-items/`,
  [OFFICER_TIMELINE_ITEMS_REQUEST_START,
   OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
   OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE]
);

export const flipSortOrder = createAction(OFFICER_TIMELINE_FLIP_SORT_ORDER);

export const selectMinimapItem = (index) => createAction(OFFICER_TIMELINE_SELECT_MINIMAP_ITEM)({
  index
});

export const hoverMinimapItem = (index) => createAction(OFFICER_TIMELINE_HOVER_MINIMAP_ITEM)({
  index
});

export const fetchTimelineItemsWhenIndexOutOfBound = (itemsLength, index, officerId, params) => {
  if (index >= itemsLength) {
    const minLoadingCount = index - itemsLength;
    const limit = minLoadingCount % 20 === 0 ? minLoadingCount : (Math.floor(minLoadingCount / 20) + 1) * 20;
    return fetchTimelineItems(officerId)({ ...params, limit, offset: itemsLength });
  }
  return createAction(DO_NOTHING_ACTION)();
};
