import { get, isUndefined } from 'lodash';
import { createSelector } from 'reselect';

import { getOfficerInfo } from 'selectors/officer-page';
import { getItems } from 'selectors/officer-page/new-timeline';
import { MAP_ITEMS } from 'utils/constants';


export const mapLegendSelector = createSelector(
  getOfficerInfo,
  info => ({
    unsustainedCount: get(info, 'unsustained_count', 0),
    sustainedCount: get(info, 'sustained_count', 0),
    useOfForceCount: get(info, 'trr_count', 0),
  })
);

const isMapMarker = item => (
  item.kind === MAP_ITEMS.CR && ['Not Sustained', 'Sustained'].includes(item.finding)
  || item.kind === MAP_ITEMS.FORCE
);

export const rawMapMarkersSelector = createSelector(
  getItems,
  items => items.filter(isMapMarker)
);

export const hasMapMarkersSelector = createSelector(
  getItems,
  items => !isUndefined(items.find(isMapMarker))
);

export const crMapMarkersTransform = item => ({
  point: get(item, 'point', {
    lon: 0, lat: 0
  }),
  kind: item.kind,
  finding: item.finding,
  id: item.crid,
  category: item.category,
  victims: item.victims,
  coaccused: item.coaccused,
});

export const trrMapMarkerTransform = item => ({
  point: get(item, 'point', {
    lon: 0, lat: 0
  }),
  kind: item.kind,
  id: item.trr_id.toString(),
  category: item['firearm_used'] ? 'Firearm' : item.taser ? 'Taser' : 'Use of Force Report',
});

export const mapMarkersSelector = createSelector(
  rawMapMarkersSelector,
  markers => markers.map(marker => {
    if (marker.kind === MAP_ITEMS.CR) {
      return crMapMarkersTransform(marker);
    }
    if (marker.kind === MAP_ITEMS.FORCE) {
      return trrMapMarkerTransform(marker);
    }
  })
);
