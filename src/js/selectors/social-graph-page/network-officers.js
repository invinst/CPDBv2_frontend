import { createSelector } from 'reselect';

import { extractPercentile } from 'selectors/common/percentile';

const getNetworkOfficers = state => state.socialGraphPage.networkData.networkOfficers;

export const officerDetailTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
  percentile: extractPercentile(officer['percentile']),
});

export const networkOfficersSelector = createSelector(
  [getNetworkOfficers],
  officers => officers.map(officerDetailTransform)
);
