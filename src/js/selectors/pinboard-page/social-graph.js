import { createSelector } from 'reselect';

import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';

const getOfficers = state => state.pinboardPage.graphData.data['officers'] || [];
export const getCoaccusedData = state => state.pinboardPage.graphData.data['coaccused_data'] || [];
const getListEvent = state => state.pinboardPage.graphData.data['list_event'] || [];
export const getSocialGraphRequesting = state => state.pinboardPage.graphData.requesting;

const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officerTransform)
);

const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);

export const graphDataSelector = (state) => {
  return {
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
  };
};

export const getPinboardTimelineIdx = state => state.pinboardPage.timelineIdx;

export const getPinboardRefreshIntervalId = state => state.pinboardPage.refreshIntervalId;
