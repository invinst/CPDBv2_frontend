import { createSelector } from 'reselect';
import { keys } from 'lodash';

import { moneyFormatWord } from 'utils/money';

const getCitySummary = (state) => (state.landingPage.heatMap.citySummary);

export const citySummarySelector = createSelector(
  getCitySummary,
  (citySummary) => ({
    startYear: citySummary['start_year'],
    endYear: citySummary['end_year'],
    allegationCount: citySummary['allegation_count'],
    totalLawsuitSettlements: moneyFormatWord(citySummary['total_lawsuit_settlements']),
    disciplinePercentage: Math.round((citySummary['discipline_count'] * 100) / citySummary['allegation_count']),
  })
);

export const hasCitySummarySelector = createSelector(
  getCitySummary,
  citySummary => keys(citySummary).length > 0
);
