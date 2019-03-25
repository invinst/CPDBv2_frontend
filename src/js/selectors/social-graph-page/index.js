import { createSelector } from 'reselect';

import { officersTransform, coaccusedDataTransform } from 'selectors/common/social-graph';

const getOfficers = state => state.socialGraphPage.graphData['officers'] || [];
const getCoaccusedData = state => state.socialGraphPage.graphData['coaccused_data'] || [];
export const getListEvent = state => state.socialGraphPage.graphData['list_event'] || [];

export const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officersTransform)
);

export const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);
