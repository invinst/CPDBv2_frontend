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
        { axis: 'Civilian Complaints', value: parseFloat(percentile['percentile_civilian']) },
        { axis: 'Internal Complaints', value: parseFloat(percentile['percentile_internal']) },
      ]
    }));
  }
);

export const officerYearlyFivePercentile = createSelector(
  [getOfficerPercentile],
  (officerPercentiles) => {
    return map(officerPercentiles, (percentile) => ({
      officerId: percentile['officer_id'],
      year: percentile['year'],
      items: [
        { axis: 'Taser Reports', value: parseFloat(percentile['percentile_alL_trr']) },
        { axis: 'Shooting Reports', value: parseFloat(percentile['percentile_shooting']) },
        { axis: 'Internal Complaints', value: parseFloat(percentile['percentile_internal']) },
        { axis: 'Civilian Complaints', value: parseFloat(percentile['percentile_civilian']) },
        { axis: 'Other Use of Force Report', value: parseFloat(percentile['percentile_others']) },
      ]
    }));
  }
);
