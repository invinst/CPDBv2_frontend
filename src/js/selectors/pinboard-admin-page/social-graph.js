import { createSelector } from 'reselect';
import { get, keyBy, keys } from 'lodash';

import { graphDataFormatter } from 'selectors/common/social-graph';

export const getSocialGraphRequesting = state => get(state, 'pinboardAdminPage.graphData.requesting', false);
const getCachedData = state => get(state, 'pinboardAdminPage.graphData.cachedData', []);

const cachedDataSelector = createSelector(
  getCachedData,
  allData => keyBy(allData, 'pinboard_id')
);

export const cachedDataIDsSelector = createSelector(
  cachedDataSelector,
  cachedData => keys(cachedData)
);

export const graphDataSelector = createSelector(
  cachedDataSelector,
  (_, props) => props.pinboardId,
  (cachedData, pinboardId) => graphDataFormatter(cachedData[pinboardId])
);
