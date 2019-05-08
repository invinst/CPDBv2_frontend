import { get, filter, find, isEmpty, compact } from 'lodash';
import { createSelector } from 'reselect';

import {
  crMapMarkersTransform,
  trrMapMarkerTransform,
  geographicAllegationTransform
} from 'selectors/common/geographic';
import { MAP_ITEMS } from 'utils/constants';


const getGeographicData = state => get(state, 'socialGraphPage.geographicData.mapData', []);

export const mapLegendSelector = createSelector(
  getGeographicData,
  geographicData => ({
    allegationCount: filter(geographicData, geographicDatum => geographicDatum.kind === MAP_ITEMS.CR).length,
    useOfForceCount: filter(geographicData, geographicDatum => geographicDatum.kind === MAP_ITEMS.FORCE).length,
  })
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

const getGeographicAllegation = state => {
  const crid = state.socialGraphPage.geographicData.crid;
  if (crid) {
    const allegations = get(state, 'socialGraphPage.geographicData.mapData', []);
    return find(allegations, allegation => allegation.crid === crid);
  }
};

export const geographicAllegationSelector = createSelector(
  getGeographicAllegation,
  allegation => !isEmpty(allegation) ? geographicAllegationTransform(allegation) : undefined
);
