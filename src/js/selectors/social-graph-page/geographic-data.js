import { find, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import {
  crMapMarkersTransform,
  trrMapMarkerTransform,
} from 'selectors/common/geographic';
import {
  geographicAllegationTransform,
  geographicTRRTransform,
} from 'selectors/common/geographic-preview-pane';

const getGeographicCrs = state => state.socialGraphPage.geographicData.mapCrsData;
const getGeographicTrrs = state => state.socialGraphPage.geographicData.mapTrrsData;
const getGeographicPreviewPaneCrs = state => state.socialGraphPage.geographicData.previewPaneCrsData;
const getGeographicPreviewPaneTrrs = state => state.socialGraphPage.geographicData.previewPaneTrrsData;

export const mapLegendSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (state) => state.socialGraphPage.geographicData.mapCrsDataTotalCount,
  (state) => state.socialGraphPage.geographicData.mapTrrsDataTotalCount,
  (geographicCrs, geographicTrrs, crsTotalCount, trrsTotalCount) => ({
    allegationCount: geographicCrs.length,
    useOfForceCount: geographicTrrs.length,
    allegationLoading: geographicCrs.length !== crsTotalCount,
    useOfForceLoading: geographicTrrs.length !== trrsTotalCount,
  })
);

export const mapMarkerGroupsSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (geographicCrs, geographicTrrs) => ({
    crs: geographicCrs.map(crMapMarkersTransform),
    trrs: geographicTrrs.map(trrMapMarkerTransform),
  })
);

export const geographicAllegationSelector = createSelector(
  getGeographicPreviewPaneCrs,
  (state) => state.socialGraphPage.geographicData.crid,
  (geographicPreviewPaneCrs, crid) => {
    if (crid) {
      const allegation = find(geographicPreviewPaneCrs, obj => obj.crid === crid);
      return !isEmpty(allegation) ? geographicAllegationTransform(allegation) : undefined;
    }
  }
);

export const geographicTRRSelector = createSelector(
  getGeographicPreviewPaneTrrs,
  (state) => state.socialGraphPage.geographicData.trrId,
  (geographicPreviewPaneTrrs, trrId) => {
    if (trrId) {
      const trr = find(geographicPreviewPaneTrrs, obj => obj['trr_id'] === parseInt(trrId));
      return !isEmpty(trr) ? geographicTRRTransform(trr) : undefined;
    }
  }
);

export const isRequestedSelector = createSelector(
  (state) => state.socialGraphPage.geographicData.isCrsRequested,
  (state) => state.socialGraphPage.geographicData.isTrrsRequested,
  (isCrsRequested, isTrrsRequested) => isCrsRequested && isTrrsRequested
);
