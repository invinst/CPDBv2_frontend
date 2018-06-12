import { createSelector } from 'reselect';
import { keys } from 'lodash';


const getCitySummary = (state) => (state.landingPage.heatMap.citySummary);

export const citySummarySelector = createSelector(
  getCitySummary,
  (citySummary) => ({
    allegationCount: citySummary['allegation_count'],
    disciplinePercentage: Math.round((citySummary['discipline_count'] * 100) / citySummary['allegation_count']),
    mostCommonComplaints: citySummary['most_common_complaints']
  })
);

export const hasCitySummarySelector = createSelector(
  getCitySummary,
  citySummary => keys(citySummary).length > 0
);
