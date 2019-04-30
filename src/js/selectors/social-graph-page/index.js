import { createSelector } from 'reselect';

import { officerDetailTransform, coaccusedDataTransform } from 'selectors/common/social-graph';
import { get } from 'lodash';

const getOfficers = state => state.socialGraphPage.graphData['officers'] || [];
const getAllegations = state => state.socialGraphPage.graphAllegations;
const getCoaccusedData = state => state.socialGraphPage.graphData['coaccused_data'] || [];
export const getListEvent = state => state.socialGraphPage.graphData['list_event'] || [];

const allegationTransform = allegation => ({
  crid: allegation['crid'],
  incidentDate: allegation['incident_date'],
  category: get(allegation, 'most_common_category.category') || 'Unknown',
  subcategory: get(allegation, 'most_common_category.allegation_name') || 'Unknown',
});

export const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officerDetailTransform)
);

export const allegationsSelector = createSelector(
  [getAllegations],
  allegations => allegations.map(allegationTransform)
);

export const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);

export const hasComplaintSelector = () => true;

export const getCurrentMainTab = state => state.socialGraphPage.currentMainTab;
export const getCurrentNetworkTab = state => state.socialGraphPage.currentNetworkTab;
