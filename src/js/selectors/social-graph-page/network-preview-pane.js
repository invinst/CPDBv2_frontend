import { filter, find, isEmpty, kebabCase, map, compact } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment/moment';

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
import { getDemographicString } from 'utils/victims';
import { extractPercentile } from 'selectors/common/percentile';


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

export const accusedTransform = coaccused => {
  const percentile = extractPercentile(coaccused.percentile);
  return {
    id: coaccused.id,
    name: coaccused['full_name'],
    url: `/officer/${coaccused.id}/${kebabCase(coaccused['full_name'])}/`,
    count: coaccused['allegation_count'],
    radarAxes: percentile.items,
    radarColor: percentile.visualTokenBackground,
  };
};

export const networkAllegationTransform = networkCRDatum => ({
  category: networkCRDatum.category,
  subCategory: networkCRDatum.subcategory,
  incidentDate: moment(networkCRDatum['incident_date']).format('MMM D, YYYY').toUpperCase(),
  address: networkCRDatum.address,
  victims: compact(map(networkCRDatum.victims, getDemographicString)),
  coaccused: map(networkCRDatum['coaccused'], coaccused => accusedTransform(coaccused)),
  to: networkCRDatum.to,
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

export const getNetworkAllegation = state => {
  const selectedCrid = state.socialGraphPage.networkData.selectedCrid;
  if (selectedCrid) {
    const allegations = state.socialGraphPage.networkData.networkAllegations;
    return find(allegations, allegation => allegation.crid === selectedCrid);
  }
};

export const networkAllegationSelector = createSelector(
  getNetworkAllegation,
  allegation => !isEmpty(allegation) ? networkAllegationTransform(allegation) : undefined
);

export const getNetworkPreviewPaneData = (state) => {
  const networkOfficer = networkOfficerSelector(state);
  const selectedEdge = getSelectedEdge(state);
  const networkAllegation = networkAllegationSelector(state);

  if (!isEmpty(networkOfficer)) {
    return { type: NETWORK_PREVIEW_PANE.OFFICER, data: networkOfficer };
  } else if (!isEmpty(networkAllegation)) {
    return { type: NETWORK_PREVIEW_PANE.CR, data: networkAllegation };
  } else if (!isEmpty(selectedEdge)) {
    const edgeCoaccusalsItems = edgeCoaccusalsItemsSelector(state);
    const edgeOfficers = edgeOfficersSelector(state);
    const coaccusedCount = edgeCoaccusalsItems.length;
    return {
      type: NETWORK_PREVIEW_PANE.EDGE_COACCUSALS,
      data: {
        items: transformSocialGraphAllegationItems(edgeCoaccusalsItems),
        info: { ...edgeOfficers, coaccusedCount },
      },
    };
  }
};
