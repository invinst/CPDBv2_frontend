import { createSelector } from 'reselect';
import { map } from 'lodash';


const getSummary = state => state.officerPage.summary;
export const getOfficerName = state => state.officerPage.fullName;
export const getOfficerId = state => state.officerPage.officerId;
export const getComplaintsCount = state => state.officerPage.complaintsCount;
export const getSustainedCount = state => state.officerPage.sustainedCount;
export const getComplaintsByYear = state => state.officerPage.complaintsByYear;
const getComplaintFacets = state => state.officerPage.complaintFacets;

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
    rank: summary.rank ? summary.rank : 'N/A',
    dateOfAppt: summary['date_of_appt'],
    race: summary.race,
    gender: summary.gender,
    badge: summary.badge,
    // TODO: server doesn't actually return date_of_resignation & agency
    // fields yet. Recheck these fields once they're implemented.
    dateOfResignation: summary['date_of_resignation'],
    agency: summary.agency
  })
);
