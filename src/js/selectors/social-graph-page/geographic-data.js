import { get, filter } from 'lodash';
import { createSelector } from 'reselect';

import { crMapMarkersTransform, trrMapMarkerTransform } from 'selectors/common/geographic';
import { MAP_ITEMS } from 'utils/constants';


const getGeographicData = state => get(state, 'socialGraphPage.geographicData', []);

export const mapLegendSelector = createSelector(
  getGeographicData,
  geographicData => ({
    allegationCount: filter(geographicData, geographicDatum => geographicDatum.kind === MAP_ITEMS.CR).length,
    useOfForceCount: filter(geographicData, geographicDatum => geographicDatum.kind === MAP_ITEMS.FORCE).length,
  })
);

export const mapMarkersSelector = createSelector(
  getGeographicData,
  markers => markers.map(marker => {
    if (marker.kind === MAP_ITEMS.CR) {
      return crMapMarkersTransform(marker);
    } else if (marker.kind === MAP_ITEMS.FORCE) {
      return trrMapMarkerTransform(marker);
    }
  })
);
