import { concat, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import { crMapMarkersTransform, trrMapMarkerTransform } from 'selectors/common/geographic';


const getGeographicCrs = state => state.pinboardPage.geographicData.mapCrsData;
const getGeographicTrrs = state => state.pinboardPage.geographicData.mapTrrsData;
export const getClearAllMarkers = state => state.pinboardPage.geographicData.clearAllMarkers;

export const geographicDataRequestingSelector = createSelector(
  (state) => state.pinboardPage.geographicData.crsRequesting,
  (state) => state.pinboardPage.geographicData.trrsRequesting,
  (crsRequesting, trrsRequesting) => crsRequesting || trrsRequesting
);

export const geographicDataLoadingSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (state) => state.pinboardPage.geographicData.mapCrsDataTotalCount,
  (state) => state.pinboardPage.geographicData.mapTrrsDataTotalCount,
  (geographicCrs, geographicTrrs, crsTotalCount, trrsTotalCount) => (
    geographicCrs.length !== crsTotalCount || geographicTrrs.length !== trrsTotalCount
  )
);

export const hasMapMarkersSelector = createSelector(
  geographicDataRequestingSelector,
  getGeographicCrs,
  getGeographicTrrs,
  (requesting, geographicCrs, geographicTrrs) => !requesting && (!isEmpty(geographicCrs) || !isEmpty(geographicTrrs))
);

export const mapMarkersSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (geographicCrs, geographicTrrs) => concat(
    geographicCrs.map(marker => crMapMarkersTransform(marker)),
    geographicTrrs.map(marker => trrMapMarkerTransform(marker)),
  )
);
