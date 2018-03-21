import { createSelector } from 'reselect';
import { map } from 'lodash';
import { extractPercentile } from 'selectors/landing-page/common';


export const getOfficerPercentile = state => state.officerPage.percentile.items;

export const officerYearlyThreePercentile = createSelector(
  [getOfficerPercentile],
  (officerPercentiles) => map(officerPercentiles, extractPercentile)
);
