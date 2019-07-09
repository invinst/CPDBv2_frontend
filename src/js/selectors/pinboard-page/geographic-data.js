import { get, isEmpty, filter, compact } from 'lodash';
import { createSelector } from 'reselect';

import { crMapMarkersTransform, trrMapMarkerTransform } from 'selectors/common/geographic';
import { MAP_ITEMS, PINBOARD_PAGE_TAB_NAMES } from 'utils/constants';


const getGeographicData = state => get(state, 'pinboardPage.geographicData.data', []);
export const getGeographicDataRequesting = state => get(state, 'pinboardPage.geographicData.requesting', false);

export const mapLegendSelector = createSelector(
  getGeographicData,
  geographicData => ({
    allegationCount: filter(geographicData, geographicDatum => geographicDatum.kind === MAP_ITEMS.CR).length,
    useOfForceCount: filter(geographicData, geographicDatum => geographicDatum.kind === MAP_ITEMS.FORCE).length,
  })
);

export const hasMapMarkersSelector = createSelector(
  getGeographicData,
  geographicData => !isEmpty(geographicData)
);

export const mapMarkersSelector = createSelector(
  getGeographicData,
  markers => compact(
    markers.map(marker => {
      if (marker.kind === MAP_ITEMS.CR) {
        return crMapMarkersTransform(marker);
      } else if (marker.kind === MAP_ITEMS.FORCE) {
        return trrMapMarkerTransform(marker);
      }
    })
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
