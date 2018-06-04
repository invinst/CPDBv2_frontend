import { createSelector } from 'reselect';
import { get } from 'lodash';

import { getOfficerInfo } from 'selectors/officer-page';
import { getItems } from 'selectors/officer-page/new-timeline';


export const getMapLegend = createSelector(
  getOfficerInfo,
  info => ({
    unsustainedCount: get(info, 'unsustained_count'),
    sustainedCount: get(info, 'sustained_count'),
    useOfForceCount: get(info, 'trr_count'),
  })
);

export const getMapMarkers = createSelector(
  getItems,
  items => {
    const filteredItems = items.filter(item => ['CR', 'TRR'].includes(item.kind));
    return filteredItems.map(item => ({
      point: get(item, 'point', {
        lon: 0, lat: 0
      }),
      kind: item.kind,
      finding: get(item, 'finding'),
      id: item.crid,
      category: item.category,
      victims: item.victims,
      coaccused: item.coaccused,
    }));
  }
);
