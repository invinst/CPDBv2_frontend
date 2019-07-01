import { filter, find, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import {
  getGraphDataOfficers,
  transformSocialGraphAllegationItems,
  getSelectedOfficerId,
  getSelectedEdge,
  edgeCoaccusalsItemsSelector,
} from './network';
import { officerPath } from 'utils/paths';
import { officerTransform } from 'selectors/common/preview-pane-transforms';
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

export const officerDetailTransform = officer => {
  return {
    ...officerTransform(officer),
    to: officerPath(officer),
  };
};

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
