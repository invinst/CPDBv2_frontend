import { createSelector } from 'reselect';
import { get, isEmpty, keys, keyBy } from 'lodash';

import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';
import { getPinboardID } from 'utils/location';
import { currentPinboardIdSelector } from 'selectors/pinboard-page/pinboard';

export const getSocialGraphRequesting = state => state.pinboardPage.graphData.requesting;
export const getExpandedLink = url => `/social-graph/?pinboard_id=${getPinboardID(url)}`;
const getCachedData = state => get(state, 'pinboardPage.graphData.cachedData', {});

const cachedDataSelector = createSelector(
  getCachedData,
  allData => keyBy(allData, 'pinboard_id')
);

export const cachedDataIDsSelector = createSelector(
  cachedDataSelector,
  cachedData => keys(cachedData)
);

export const isCoaccusedDataEmptySelector = createSelector(
  cachedDataSelector,
  currentPinboardIdSelector,
  (cachedData, pinboardId) => isEmpty(get(cachedData, `${pinboardId}.coaccused_data`, []))
);

const dataFormatter = data => ({
  officers: get(data, 'officers', []).map(officerTransform),
  coaccusedData: get(data, 'coaccused_data', []).map(coaccusedDataTransform),
  listEvent: get(data, 'list_event', []),
});

export const graphDataSelector = createSelector(
  cachedDataSelector,
  (_, props) => props.pinboardId,
  (cachedData, pinboardId) => dataFormatter(cachedData[pinboardId])
);

export const currentGraphDataSelector = createSelector(
  cachedDataSelector,
  currentPinboardIdSelector,
  (cachedData, pinboardId) => dataFormatter(cachedData[pinboardId])
);

export const getPinboardTimelineIdx = state => state.pinboardPage.timelineIdx;
export const getPinboardRefreshIntervalId = state => state.pinboardPage.refreshIntervalId;
