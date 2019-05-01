import { createSelector } from 'reselect';

import { get } from 'lodash';

const getAllegations = state => state.socialGraphPage.networkData.networkAllegations;

export const allegationTransform = allegation => ({
  crid: allegation['crid'],
  incidentDate: allegation['incident_date'],
  category: get(allegation, 'most_common_category.category') || 'Unknown',
  subcategory: get(allegation, 'most_common_category.allegation_name') || 'Unknown',
});

export const allegationsSelector = createSelector(
  [getAllegations],
  allegations => allegations.map(allegationTransform)
);
