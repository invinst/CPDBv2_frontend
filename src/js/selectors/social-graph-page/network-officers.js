import { isEmpty, sortBy, indexOf } from 'lodash';
import { createSelector } from 'reselect';

import { extractPercentile } from 'selectors/common/percentile';

const getNetworkOfficers = state => state.socialGraphPage.networkData.networkOfficers;
export const getNetworkOfficersRequesting = state => state.socialGraphPage.networkData.networkOfficersRequesting;

export const officerDetailTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
  percentile: extractPercentile(officer['percentile']),
});

export const sortedNetworkOfficersSelector = createSelector(
  getNetworkOfficers,
  (state, props) => props.sortedOfficerIds,
  (officers, sortedOfficerIds) => {
    if (!isEmpty(sortedOfficerIds)) {
      officers = sortBy(officers, (officer) => indexOf(sortedOfficerIds, officer.id));
    }
    return officers.map(officerDetailTransform);
  }
);
