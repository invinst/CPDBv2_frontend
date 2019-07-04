import { get, isEmpty, concat } from 'lodash';
import { createSelector } from 'reselect';

import { crMapMarkersTransform, trrMapMarkerTransform } from 'selectors/common/geographic';
import { PINBOARD_PAGE_TAB_NAMES } from 'utils/constants';


const getGeographicCrs = state => state.pinboardPage.geographicData.mapCrsData;
const getGeographicTrrs = state => state.pinboardPage.geographicData.mapTrrsData;
export const getGeographicDataRequesting = state => get(state, 'pinboardPage.geographicData.requesting', false);
export const getClearAllMarkers = state => state.pinboardPage.geographicData.clearAllMarkers;

export const mapLegendSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (state) => state.pinboardPage.geographicData.mapCrsDataTotalCount,
  (state) => state.pinboardPage.geographicData.mapTrrsDataTotalCount,
  (geographicCrs, geographicTrrs, crsTotalCount, trrsTotalCount) => ({
    allegationCount: geographicCrs.length,
    useOfForceCount: geographicTrrs.length,
    allegationLoading: geographicCrs.length !== crsTotalCount,
    useOfForceLoading: geographicTrrs.length !== trrsTotalCount,
  })
);

export const hasMapMarkersSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (geographicCrs, geographicTrrs) => !isEmpty(geographicCrs) || !isEmpty(geographicTrrs)
);

export const mapMarkersSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (geographicCrs, geographicTrrs) => concat(
    geographicCrs.map(marker => crMapMarkersTransform(marker)),
    geographicTrrs.map(marker => trrMapMarkerTransform(marker)),
  )
);

export const getCurrentTab = state => {
  if (
    isEmpty(state.pinboardPage.graphData.data['coaccused_data'])
    && isEmpty(state.pinboardPage.geographicData.data)
  ) {
    return PINBOARD_PAGE_TAB_NAMES.NETWORK;
  } else if (isEmpty(state.pinboardPage.graphData.data['coaccused_data'])) {
    return PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC;
  }
  return state.pinboardPage.currentTab;
};
