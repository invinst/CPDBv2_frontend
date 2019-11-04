import { createSelector } from 'reselect';
import { get, isEmpty, keys } from 'lodash';

import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';
import { getPinboardID } from 'utils/location';
import { getRawPinboard } from 'selectors/pinboard-page/pinboard';

export const getSocialGraphRequesting = state => state.pinboardPage.graphData.requesting;
export const getExpandedLink = url => `/social-graph/?pinboard_id=${getPinboardID(url)}`;
export const getCachedData = state => get(state, 'pinboardPage.graphData.cachedData', {});

export const cachedDataIDsSelector = createSelector(
  getCachedData,
  cachedData => keys(cachedData)
);

export const isCoaccusedDataEmptySelector = createSelector(
  getCachedData,
  getRawPinboard,
  (cachedData, pinboard) => isEmpty(get(cachedData[pinboard.id], 'coaccused_data', []))
);

const dataFormatter = data => ({
  officers: get(data, 'officers', []).map(officerTransform),
  coaccusedData: get(data, 'coaccused_data', []).map(coaccusedDataTransform),
  listEvent: get(data, 'list_event', []),
});

export const graphDataSelector = (id) => createSelector(
  getCachedData,
  cachedData => dataFormatter(cachedData[id])
);

export const currentGraphDataSelector = createSelector(
  getCachedData,
  getRawPinboard,
  (cachedData, pinboard) => dataFormatter(cachedData[pinboard.id])
);

export const getPinboardTimelineIdx = state => state.pinboardPage.timelineIdx;
export const getPinboardRefreshIntervalId = state => state.pinboardPage.refreshIntervalId;
