import { createSelector } from 'reselect';
import { get } from 'lodash';
import moment from 'moment';

import { getThisYear } from 'utils/date';


const getSummary = state => state.officerPage.summary;
const getMetrics = state => state.officerPage.metrics;
const formatCareerDate = inputDate => moment(inputDate).format('ll').toUpperCase();

const getCareerDuration = (dateOfAppt, dateOfResignation) => {
  if (!dateOfAppt && !dateOfResignation) {
    return '';
  }

  const careerStart = formatCareerDate(dateOfAppt);
  const careerEnd = dateOfResignation ? formatCareerDate(dateOfResignation) : 'Present';
  return `${careerStart}—${careerEnd}`;
};

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
export const getOfficerId = state => state.officerPage.officerId;
export const getActiveTab = state => state.officerPage.activeTab;
export const getPathname = state => state.officerPage.pathname;
export const breadcrumbCachedFullName = state => state.officerPage.breadcrumbCachedFullName;

export const summarySelector = createSelector(
  getSummary,
  summary => ({
    unitName: summary.unit,
    rank: getSummaryRank(summary),
    dateOfAppt: summary['date_of_appt'],
    birthYear: summary['birth_year'],
    race: summary.race,
    gender: summary.gender,
    badge: summary.badge,
    careerDuration: getCareerDuration(summary['date_of_appt'], summary['date_of_resignation']),
    careerDescription: getCareerDescription(summary['date_of_appt'], summary['date_of_resignation']),
  })
);

export const DATA_NOT_AVAILABLE = 'N/A';

export const metricsSelector = createSelector(
  getMetrics,
  metrics => ({
    allegationCount: get(metrics, 'allegation_count', DATA_NOT_AVAILABLE),
    topAllegationPercentile: get(metrics, 'complaint_percentile', DATA_NOT_AVAILABLE),
    honorableMentionCount: get(metrics, 'honorable_mention_count', DATA_NOT_AVAILABLE),
    sustainedCount: get(metrics, 'sustained_count', DATA_NOT_AVAILABLE),
    disciplineCount: get(metrics, 'discipline_count', DATA_NOT_AVAILABLE),
    topHonorableMentionPercentile: get(metrics, 'top_honorable_mention_percentile', DATA_NOT_AVAILABLE),
    useOfForceCount: get(metrics, 'use_of_force_count', DATA_NOT_AVAILABLE),
    majorAwardCount: get(metrics, 'major_award_count', DATA_NOT_AVAILABLE),
    topUseOfForcePercentile: get(metrics, 'top_use_of_force_percentile', DATA_NOT_AVAILABLE),
    civilianComplimentCount: get(metrics, 'civilian_compliment_count', DATA_NOT_AVAILABLE),
  })
);
