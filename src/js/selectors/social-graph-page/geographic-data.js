import { get, filter, find, isEmpty, compact } from 'lodash';
import { createSelector } from 'reselect';

import {
  crMapMarkersTransform,
  trrMapMarkerTransform,
} from 'selectors/common/geographic';
import {
  geographicAllegationTransform,
  geographicTRRTransform,
} from 'selectors/common/geographic-preview-pane';
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

const previewPaneData = state => get(state, 'socialGraphPage.geographicData.previewPaneData', []);

const getGeographicAllegation = state => {
  const crid = state.socialGraphPage.geographicData.crid;
  if (crid) {
    const allegations = filter(previewPaneData(state), previewPaneDatum => previewPaneDatum['kind'] === 'CR');
    return find(allegations, allegation => allegation.crid === crid);
  }
};

const getGeographicTRR = state => {
  const trrId = state.socialGraphPage.geographicData.trrId;
  if (trrId) {
    const trrs = filter(previewPaneData(state), previewPaneDatum => previewPaneDatum['kind'] === 'FORCE');
    return find(trrs, trr => trr['trr_id'] === parseInt(trrId));
  }
};

export const geographicAllegationSelector = createSelector(
  getGeographicAllegation,
  allegation => !isEmpty(allegation) ? geographicAllegationTransform(allegation) : undefined
);

export const geographicTRRSelector = createSelector(
  getGeographicTRR,
  trr => !isEmpty(trr) ? geographicTRRTransform(trr) : undefined
);
