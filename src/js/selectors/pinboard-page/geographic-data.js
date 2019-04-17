import { get, isEmpty, filter } from 'lodash';
import { createSelector } from 'reselect';

import { MAP_ITEMS } from 'utils/constants';


const getGeographicData = state => get(state, 'pinboardPage.geographicData', []);

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

export const crMapMarkersTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  kind: geographicDatum.kind,
  id: geographicDatum.crid,
  category: geographicDatum.category,
  victims: geographicDatum.victims,
  coaccused: geographicDatum['coaccused_count'],
});

export const trrMapMarkerTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  kind: geographicDatum.kind,
  id: geographicDatum.trr_id.toString(),
  category: geographicDatum['firearm_used'] ? 'Firearm' : geographicDatum.taser ? 'Taser' : 'Use of Force Report',
});

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

export const getCurrentTab = state => state.pinboardPage.currentTab;
