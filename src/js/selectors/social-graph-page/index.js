import { createSelector } from 'reselect';

import { officerDetailTransform, coaccusedDataTransform } from 'selectors/common/social-graph';

const getOfficers = state => state.socialGraphPage.graphData['officers'] || [];
const getCoaccusedData = state => state.socialGraphPage.graphData['coaccused_data'] || [];
export const getListEvent = state => state.socialGraphPage.graphData['list_event'] || [];

export const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officerDetailTransform)
);

export const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);

export const hasComplaintSelector = () => true;

export const getCurrentTab = state => state.socialGraphPage.currentTab;
