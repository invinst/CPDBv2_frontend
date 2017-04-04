import { createSelector } from 'reselect';
import moment from 'moment';


const getSummary = state => state.officerPage.summary;
export const getOfficerName = state => state.officerPage.fullName;
export const getComplaintsCount = state => state.officerPage.complaintsCount;
export const getComplaintFacets = state => state.officerPage.complaintFacets;

export const summarySelector = createSelector(
  getSummary,
  summary => ({
    unitName: summary.unit,
    rank: summary.rank ? summary.rank : 'N/A',
    dateOfAppt: moment(summary['date_of_appt']).format('ll').toUpperCase(),
    race: summary.race,
    gender: summary.gender,
    badge: summary.badge
  })
);
