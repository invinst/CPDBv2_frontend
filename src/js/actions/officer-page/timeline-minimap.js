import { find as lodashFind } from 'lodash';
import { get } from 'actions/common/async-action';
import { fetchTimelineItemsWhenIndexOutOfBound, selectMinimapItem } from 'actions/officer-page/timeline';
import { minimapSelector, getTimelineFilters, sortParamsSelector } from 'selectors/officer-page/timeline';
import { getOfficerId } from 'selectors/officer-page';

import {
  OFFICER_URL, OFFICER_TIMELINE_MINIMAP_REQUEST_START, OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
  OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE
} from 'utils/constants';

export const fetchMinimap = (offficerId, params) => (get(
  `${OFFICER_URL}${offficerId}/timeline-minimap/`,
  [
    OFFICER_TIMELINE_MINIMAP_REQUEST_START,
    OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS,
    OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE
  ]
)(params));

export const selectLatestMinimapItemInYear = (year) => (dispatch, getState) => {
  if (!year) {
    return;
  }
  const state = getState();
  const element = lodashFind(minimapSelector(state), { 'year': year });

  if (!element) {
    return;
  }

  const latestCrItem = lodashFind(element.items, { kind: 'CR' });

  if (latestCrItem) {
    return dispatch(fetchTimelineItemsWhenIndexOutOfBound(
      latestCrItem.index,
      getOfficerId(state),
      { ...sortParamsSelector(state), ...getTimelineFilters(state) }
    )).then(() => {
      return dispatch(selectMinimapItem(latestCrItem.index));
    });
  }
};

export const fetchMinimapThenSelectTimelineItem = (officerId, newQuery, year) => (dispatch) => {
  return dispatch(fetchMinimap(officerId, newQuery)).then(() => {
    return dispatch(selectLatestMinimapItemInYear(year));
  });
};
