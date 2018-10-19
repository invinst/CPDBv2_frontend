import { createSelector } from 'reselect';
import { get, last, map, kebabCase, isEmpty } from 'lodash';
import moment from 'moment';

import { getThisYear, getCareerDuration } from 'utils/date';
import { extractPercentile } from 'selectors/common/percentile';


export const getOfficerInfo = state => state.officerPage.summary;
export const getCurrentTab = state => state.officerPage.currentTab;

const getCareerDescription = (dateOfAppt, dateOfResignation) => {
  if (!dateOfAppt && !dateOfResignation) {
    return '';
  }

  const endYear = dateOfResignation ? moment(dateOfResignation).year() : getThisYear();
  const yearsSinceAppt = endYear - moment(dateOfAppt).year();
  if (yearsSinceAppt < 1) {
    return '';
  }
  const yearText = yearsSinceAppt === 1 ? 'year' : 'years';
  return `${yearsSinceAppt} ${yearText}`;
};

const getSummaryRank = summary => {
  if (summary.rank === undefined) {
    return '';
  }
  return summary.rank ? summary.rank : 'N/A';
};

export const getOfficerName = state => state.officerPage.fullName;
export const getOfficerSlug = state => kebabCase(getOfficerName(state));
export const getOfficerId = state => state.officerPage.officerId;
export const breadcrumbCachedFullName = state => state.officerPage.breadcrumbCachedFullName;

export const getEditModeOn = state => state.officerPage.editModeOn;

export const summarySelector = createSelector(
  getOfficerInfo,
  summary => ({
    unitName: get(summary.unit, 'unit_name'),
    unitDescription: get(summary.unit, 'description'),
    rank: getSummaryRank(summary),
    dateOfAppt: summary['date_of_appt'],
    birthYear: summary['birth_year'],
    race: summary.race,
    gender: summary.gender,
    badge: isEmpty(summary.badge) ? 'Unknown' : summary.badge,
    historicBadges: summary['historic_badges'],
    careerDuration: getCareerDuration(summary['date_of_appt'], summary['date_of_resignation']),
    careerDescription: getCareerDescription(summary['date_of_appt'], summary['date_of_resignation']),
    currentSalary: get(summary, 'current_salary', null),
  })
);

export const DATA_NOT_AVAILABLE = 'N/A';

export const metricsSelector = createSelector(
  getOfficerInfo,
  summary => {
    const percentiles = get(summary, 'percentiles', []);
    return {
      allegationCount: get(summary, 'allegation_count', DATA_NOT_AVAILABLE),
      allegationPercentile: get(summary, 'complaint_percentile', DATA_NOT_AVAILABLE),
      honorableMentionCount: get(summary, 'honorable_mention_count', DATA_NOT_AVAILABLE),
      sustainedCount: get(summary, 'sustained_count', DATA_NOT_AVAILABLE),
      disciplineCount: get(summary, 'discipline_count', DATA_NOT_AVAILABLE),
      honorableMentionPercentile: get(summary, 'honorable_mention_percentile', DATA_NOT_AVAILABLE),
      useOfForceCount: get(summary, 'trr_count', DATA_NOT_AVAILABLE),
      majorAwardCount: get(summary, 'major_award_count', DATA_NOT_AVAILABLE),
      useOfForcePercentile: get(last(percentiles), 'percentile_trr', DATA_NOT_AVAILABLE),
      civilianComplimentCount: get(summary, 'civilian_compliment_count', DATA_NOT_AVAILABLE),
    };
  }
);

export const getOfficerPercentile = state => state.officerPage.summary.percentiles;

export const officerYearlyThreePercentile = createSelector(
  [getOfficerPercentile],
  (officerPercentiles) => map(officerPercentiles, extractPercentile)
);
