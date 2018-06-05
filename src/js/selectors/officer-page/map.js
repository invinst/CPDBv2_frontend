import { get } from 'lodash';
import { createSelector } from 'reselect';

import { getOfficerInfo } from 'selectors/officer-page';
import { getItems } from 'selectors/officer-page/new-timeline';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';


export const mapLegendSelector = createSelector(
  getOfficerInfo,
  info => ({
    unsustainedCount: get(info, 'unsustained_count'),
    sustainedCount: get(info, 'sustained_count'),
    useOfForceCount: get(info, 'trr_count'),
  })
);

export const rawMapMarkersSelector = createSelector(
  getItems,
  items => {
    return items.filter(item => {
      if (item.kind === NEW_TIMELINE_ITEMS.CR) {
        if (['Not Sustained', 'Sustained'].includes(item.finding)) {
          return item;
        }
      }
      if (item.kind === NEW_TIMELINE_ITEMS.FORCE) {
        return item;
      }
    });
  }
);

export const mapMarkersTransform = item => ({
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

export const mapMarkersSelector = createSelector(
  rawMapMarkersSelector,
  markers => markers.map(marker => mapMarkersTransform(marker))
);
