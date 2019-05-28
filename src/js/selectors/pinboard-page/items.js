import { createSelector } from 'reselect';
import { map } from 'lodash';

import { officerCardTransform } from 'selectors/common/officer-card';

const officerPinnedTransform = (officer) => {
  officer = {
    ...officerCardTransform(officer),
    type: 'OFFICER',
    isPinned: true,
  };
  officer['id'] = officer['id'].toString();
  return officer;
};

const crPinnedTransform = (cr) => ({
  id: cr['crid'],
  type: 'CR',
  isPinned: true,
  incidentDate: cr['incident_date'],
  category: cr['most_common_category'],
  point: cr['point'],
});

const trrPinnedTransform = (trr) => ({
  id: trr['id'].toString(),
  type: 'TRR',
  isPinned: true,
  category: trr['category'],
  trrDate: trr['trr_datetime'],
  point: trr['point'],
});

export const pinnedOfficersSelector = createSelector(
  state => state.pinboardPage.officerItems.items,
  officers => map(officers, officerPinnedTransform),
);

export const pinnedCRsSelector = createSelector(
  state => state.pinboardPage.crItems.items,
  crs => map(crs, crPinnedTransform),
);

export const pinnedTRRsSelector = createSelector(
  state => state.pinboardPage.trrItems.items,
  trrs => map(trrs, trrPinnedTransform),
);

export const getPinnedOfficersRequesting = state => state.pinboardPage.officerItems.requesting;
export const getPinnedCRsRequesting = state => state.pinboardPage.crItems.requesting;
export const getPinnedTRRsRequesting = state => state.pinboardPage.trrItems.requesting;
