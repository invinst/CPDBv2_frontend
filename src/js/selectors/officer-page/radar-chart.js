import { createSelector } from 'reselect';
import { map } from 'lodash';

export const getOfficerPercentile = state => state.officerPage.percentile.items;

export const officerYearlyThreePercentile = createSelector(
  [getOfficerPercentile],
  (officerPercentiles) => {
    return map(officerPercentiles, (percentile) => ({
      officerId: percentile['officer_id'],
      year: percentile['year'],
      items: [
        { axis: 'Use of Force Reports', value: parseFloat(percentile['percentile_alL_trr']) },
        { axis: 'Internal Complaints', value: parseFloat(percentile['percentile_internal']) },
        { axis: 'Civilian Complaints', value: parseFloat(percentile['percentile_civilian']) }
      ]
    }));
  }
);
