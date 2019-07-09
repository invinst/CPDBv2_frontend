import { createSelector } from 'reselect';

import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';
import { getPinboardID } from 'utils/location';

const getOfficers = state => state.pinboardPage.graphData.data['officers'] || [];
const getCoaccusedData = state => state.pinboardPage.graphData.data['coaccused_data'] || [];
const getListEvent = state => state.pinboardPage.graphData.data['list_event'] || [];
export const getRequesting = state => state.pinboardPage.graphData.requesting;
export const getExpandedLink = (url) => `/social-graph/?pinboard_id=${getPinboardID(url)}`;

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
