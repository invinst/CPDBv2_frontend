import { createSelector } from 'reselect';
import { find, get, isEmpty } from 'lodash';

import { extractPercentile } from 'selectors/common/percentile';
import { roundedPercentile } from 'utils/calculations';
import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';
import { formatDate, getCurrentAge } from 'utils/date';
import { officerPath } from 'utils/paths';

const getGraphDataOfficers = state => state.socialGraphPage.networkData.graphData['officers'] || [];
const getCoaccusedData = state => state.socialGraphPage.networkData.graphData['coaccused_data'] || [];
export const getListEvent = state => state.socialGraphPage.networkData.graphData['list_event'] || [];

export const officerDetailTransform = officer => ({
  id: officer['id'],
  to: officerPath(officer),
  fullName: officer['full_name'],
  appointedDate: formatDate(officer['appointed_date']),
  resignationDate: formatDate(officer['resignation_date']),
  badge: officer['badge'],
  gender: officer['gender'] || '',
  age: getCurrentAge(officer['birth_year']) || null,
  race: officer['race'] || '',
  rank: officer['rank'],
  unit: {
    id: get(officer['unit'], 'id'),
    unitName: get(officer['unit'], 'unit_name'),
    description: get(officer['unit'], 'description'),
  },
  lastPercentile: extractPercentile(officer['percentile']),
  complaintCount: officer['allegation_count'],
  complaintPercentile: roundedPercentile(get(officer['percentile'], 'percentile_allegation')),
  civilianComplimentCount: officer['civilian_compliment_count'],
  sustainedCount: officer['sustained_count'],
  disciplineCount: officer['discipline_count'],
  trrCount: get(officer, 'trr_count'),
  trrPercentile: roundedPercentile(get(officer['percentile'], 'percentile_trr')),
  majorAwardCount: get(officer, 'major_award_count'),
  honorableMentionCount: get(officer, 'honorable_mention_count'),
  honorableMentionPercentile: roundedPercentile(get(officer, 'honorable_mention_percentile')),
});

export const officersSelector = createSelector(
  [getGraphDataOfficers],
  officers => officers.map(officerTransform)
);

export const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);

const getNetworkOfficer = (state) => {
  const officerId = state.socialGraphPage.networkData.officerId;
  if (officerId) {
    const officers = state.socialGraphPage.networkData.networkOfficers;
    return find(officers, officer => officer.id === officerId);
  }
};

export const networkOfficerSelector = createSelector(
  getNetworkOfficer,
  officer => !isEmpty(officer) ? officerDetailTransform(officer) : undefined,
);
