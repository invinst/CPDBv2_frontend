import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

import { graphDataFormatter } from 'selectors/common/social-graph';

export const getSocialGraphRequesting = state => state.pinboardPage.graphData.requesting;
const getData = state => get(state, 'pinboardPage.graphData.data', {});

export const isCoaccusedDataEmptySelector = createSelector(
  getData,
  data => isEmpty(data.coaccused_data)
);

export const currentGraphDataSelector = createSelector(
  getData,
  data => graphDataFormatter(data)
);

export const getPinboardTimelineIdx = state => state.pinboardPage.timelineIdx;
export const getPinboardRefreshIntervalId = state => state.pinboardPage.refreshIntervalId;
