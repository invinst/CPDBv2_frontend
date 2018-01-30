import { createSelector } from 'reselect';


const getCitySummary = (state) => (state.landingPage.heatMap.citySummary);

export const citySummarySelector = createSelector(
  getCitySummary,
  (citySummary) => ({
    allegationCount: citySummary['allegation_count'],
    disciplineCount: citySummary['discipline_count'],
    mostCommonComplaints: citySummary['most_common_complaints']
  })
);
