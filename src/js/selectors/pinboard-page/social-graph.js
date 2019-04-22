import { createSelector } from 'reselect';

import { officersTransform, coaccusedDataTransform } from 'selectors/common/social-graph';

const getOfficers = state => state.pinboardPage.graphData['officers'] || [];
const getCoaccusedData = state => state.pinboardPage.graphData['coaccused_data'] || [];
const getListEvent = state => state.pinboardPage.graphData['list_event'] || [];

const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officersTransform)
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
