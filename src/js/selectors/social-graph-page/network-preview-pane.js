import { filter, find, get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import {
  getGraphDataOfficers,
  transformSocialGraphAllegationItems,
  getSelectedOfficerId,
  getSelectedEdge,
  edgeCoaccusalsItemsSelector,
} from './network';
import { extractPercentile } from 'selectors/common/percentile';
import { officerPath } from 'utils/paths';
import { formatDate, getCurrentAge } from 'utils/date';
import { roundedPercentile } from 'utils/calculations';
import { NETWORK_PREVIEW_PANE } from 'utils/constants';


export const edgeOfficersSelector = createSelector(
  getSelectedEdge,
  getGraphDataOfficers,
  (selectedEdge, officers) => {
    if (selectedEdge) {
      const sourceId = selectedEdge.sourceUid;
      const targetId = selectedEdge.targetUid;
      const sourceOfficer = filter(officers, officer => officer.id === sourceId)[0];
      const targetOfficer = filter(officers, officer => officer.id === targetId)[0];
      return {
        sourceOfficerName: sourceOfficer['full_name'],
        targetOfficerName: targetOfficer['full_name'],
      };
    }
  }
);

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

const getNetworkOfficer = (state) => {
  const selectedOfficerId = getSelectedOfficerId(state);
  if (selectedOfficerId) {
    const officers = state.socialGraphPage.networkData.networkOfficers;
    return find(officers, officer => officer.id === selectedOfficerId);
  }
};

export const networkOfficerSelector = createSelector(
  getNetworkOfficer,
  officer => !isEmpty(officer) ? officerDetailTransform(officer) : undefined,
);

export const getNetworkPreviewPaneData = (state) => {
  const networkOfficer = networkOfficerSelector(state);
  const selectedEdge = getSelectedEdge(state);

  if (!isEmpty(networkOfficer)) {
    return { type: NETWORK_PREVIEW_PANE.OFFICER, data: networkOfficer };
  } else if (!isEmpty(selectedEdge)) {
    const edgeCoaccusalsItems = edgeCoaccusalsItemsSelector(state);
    const edgeOfficers = edgeOfficersSelector(state);
    const coaccusedCount = edgeCoaccusalsItems.length;
    return {
      type: NETWORK_PREVIEW_PANE.EDGE_COACCUSALS,
      data: {
        items: transformSocialGraphAllegationItems(edgeCoaccusalsItems),
        info: { ...edgeOfficers, coaccusedCount }
      }
    };
  }
};
