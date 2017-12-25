import { createSelector } from 'reselect';
import { get, sortBy, map } from 'lodash';


const getMemberRecords = state => get(state, 'unitProfilePage.summary.member_records', {});
const getComplaintRecords = state => get(state, 'unitProfilePage.summary.complaint_records', {});
const getUnitDescription = state => get(state, 'unitProfilePage.summary.description', '');

export const summarySelector = createSelector(
  getMemberRecords,
  getComplaintRecords,
  getUnitDescription,
  (memberRecords, complaintRecords, unitDescription) => ({
    description: unitDescription,
    activeMembers: get(memberRecords, 'active_members', 0),
    totalMembers: get(memberRecords, 'total', 0),
    memberFacets: _sortRecords(get(memberRecords, 'facets', [])),
    complaintCount: get(complaintRecords, 'count', 0),
    sustainedComplaintCount: get(complaintRecords, 'sustained_count', 0),
    complaintFacets: _facetsToCamelCase(_sortRecords(get(complaintRecords, 'facets', [])))
  })
);

const _sortRecords = records => (
  map(records, ({ name, entries }) => ({
    name,
    entries: sortBy(entries, ['name'])
  }))
);

const _facetsToCamelCase = facets => (
  map(facets, ({ name, entries }) => ({
    name,
    entries: map(entries, entry => ({
      name: entry.name,
      count: entry.count,
      sustainedCount: entry['sustained_count']
    }))
  }))
);
