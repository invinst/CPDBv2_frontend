import { createSelector } from 'reselect';
import { map } from 'lodash';
import moment from 'moment';


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

const getCareerDescription = (dateOfAppt, agency) => {
  if (!dateOfAppt) {
    return '';
  }

  const yearsSinceAppt = moment().year() - moment(dateOfAppt).year();
  const yearText = !agency || yearsSinceAppt === 1 ? 'year' : 'years';
  const agencyText = agency ? `with ${agency}` : 'veteran';
  return `${yearsSinceAppt} ${yearText} ${agencyText}`;
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
    race: summary.race,
    gender: summary.gender,
    badge: summary.badge,
    careerDuration: getCareerDuration(summary['date_of_appt'], summary['date_of_resignation']),
    careerDescription: getCareerDescription(summary['date_of_appt'], summary['agency'])
  })
);
