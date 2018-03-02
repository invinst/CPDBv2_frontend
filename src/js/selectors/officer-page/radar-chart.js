import { createSelector } from 'reselect';
import { map } from 'lodash';
import { getVisualTokenOIGBackground } from '../../utils/visual-token';


export const getOfficerPercentile = state => state.officerPage.percentile.items;

export const officerYearlyThreePercentile = createSelector(
  [getOfficerPercentile],
  (officerPercentiles) => {

    return map(officerPercentiles, (percentile) => {
      const { backgroundColor, textColor } = getVisualTokenOIGBackground(
        parseFloat(percentile['percentile_internal']),
        parseFloat(percentile['percentile_civilian']),
        parseFloat(percentile['percentile_alL_trr'])
      );
      return {
        officerId: percentile['officer_id'],
        year: percentile['year'],
        items: [
          { axis: 'Use of Force Reports', value: parseFloat(percentile['percentile_alL_trr']) },
          { axis: 'Internal Allegations', value: parseFloat(percentile['percentile_internal']) },
          { axis: 'Civilian Allegations', value: parseFloat(percentile['percentile_civilian']) }
        ],
        visualTokenBackground: backgroundColor,
        textColor
      };
    });
  }
);
