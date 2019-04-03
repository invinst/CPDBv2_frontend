import { createSelector } from 'reselect';


const getOfficers = state => state.socialGraphPage.graphData['officers'] || [];
const getCoaccusedData = state => state.socialGraphPage.graphData['coaccused_data'] || [];
export const getListEvent = state => state.socialGraphPage.graphData['list_event'] || [];

export const officersTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
});

export const coaccusedDataTransform = coaccusedDatum => ({
  officerId1: coaccusedDatum['officer_id_1'],
  officerId2: coaccusedDatum['officer_id_2'],
  incidentDate: coaccusedDatum['incident_date'],
  accussedCount: coaccusedDatum['accussed_count'],
});

export const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officersTransform)
);

export const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);
