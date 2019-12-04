import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

import { graphDataFormatter } from 'selectors/common/social-graph';
import { getPinboardID } from 'utils/location';

export const getSocialGraphRequesting = state => state.pinboardPage.graphData.requesting;
export const getExpandedLink = url => `/social-graph/?pinboard_id=${getPinboardID(url)}`;
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
