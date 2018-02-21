import { createSelector } from 'reselect';
import { map } from 'lodash';
import moment from 'moment';

import { getThisYear } from 'utils/date';


const getSummary = state => state.officerPage.summary;
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
export const getComplaintsCount = state => state.officerPage.complaintsCount;
export const getSustainedCount = state => state.officerPage.sustainedCount;
export const getComplaintsByYear = state => state.officerPage.complaintsByYear;
const getComplaintFacets = state => state.officerPage.complaintFacets;
export const getActiveTab = state => state.officerPage.activeTab;
export const getPathname = state => state.officerPage.pathname;
export const breadcrumbCachedFullName = state => state.officerPage.breadcrumbCachedFullName;

export const getComplaintFacetsSelector = createSelector(
  getComplaintFacets,
  complaintFacets => (map(complaintFacets, ({ name, entries }) => ({
    name,
    entries: map(entries, entry => ({
      name: entry['name'],
      count: entry['count'],
      sustainedCount: entry['sustained_count'],
      items: entry['items']
    }))
  })
)));

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

export const complaintsByYearSelector = createSelector(
  getComplaintsByYear,
  complaints => !complaints ? [] : complaints.map(complaint => ({
    year: complaint.year,
    count: complaint.count,
    sustainedCount: complaint['sustained_count']
  }))
);
