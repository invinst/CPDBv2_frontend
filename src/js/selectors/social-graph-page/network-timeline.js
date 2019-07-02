import { createSelector } from 'reselect';

import {
  getListEvent,
  getNetworkAllegations,
  transformSocialGraphAllegationItems,
} from 'selectors/social-graph-page/network';

export const socialGraphTimelineItemsSelector = createSelector(
  getNetworkAllegations,
  getListEvent,
  transformSocialGraphAllegationItems,
);

export const getSocialGraphTimelineIdx = state => state.socialGraphPage.networkData.timelineIdx;

export const getSocialGraphRefreshIntervalId = state => state.socialGraphPage.networkData.refreshIntervalId;

export const getTimelineIdxTriggerChange = state => state.socialGraphPage.networkData.timelineIdxTriggerChange;
