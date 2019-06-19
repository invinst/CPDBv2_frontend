import { isEmpty, sortBy, indexOf } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';

const getNetworkOfficers = state => state.socialGraphPage.networkData.networkOfficers;

export const officerDetailTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
  percentile: extractPercentile(officer['percentile']),
});

export const getSortedNetworkOfficers = (state, sortedOfficerIds) => {
  let officers = getNetworkOfficers(state);
  if (!isEmpty(sortedOfficerIds)) {
    officers = sortBy(officers, (officer) => indexOf(sortedOfficerIds, officer.id));
  }
  return officers.map(officerDetailTransform);
};
