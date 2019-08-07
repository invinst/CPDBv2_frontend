import { createSelector } from 'reselect';
import { map } from 'lodash';

import { officerCardTransform } from 'selectors/common/officer-card';

export const getPinnedCRs = state => state.pinboardPage.crItems.items;
export const getPinnedTRRs = state => state.pinboardPage.trrItems.items;
export const getPinnedOfficers = state => state.pinboardPage.officerItems.items;
const pinItemFromPreviewPane = state => state.pinboardPage.pinItemFromPreviewPane;

const officerPinnedTransform = (officer, updatingItem={}) => {
  officer = {
    ...officerCardTransform(officer),
    type: 'OFFICER',
    isPinned: true,
  };

  officer.id = officer.id.toString();

  const isPinStatusChanging = updatingItem.type === 'OFFICER'
    && updatingItem.id.toString() === officer.id;
  officer.isPinStatusChanging = isPinStatusChanging;

  return officer;
};

const crPinnedTransform = (cr, updatingItem={}) => ({
  id: cr['crid'],
  type: 'CR',
  isPinned: true,
  incidentDate: cr['incident_date'],
  category: cr['category'],
  point: cr['point'],
  isPinStatusChanging: updatingItem.type === 'CR' && updatingItem.id === cr['crid']
});

const trrPinnedTransform = (trr, updatingItem={}) => ({
  id: trr['id'].toString(),
  type: 'TRR',
  isPinned: true,
  category: trr['category'],
  trrDate: trr['trr_datetime'],
  point: trr['point'],
  isPinStatusChanging: updatingItem.type === 'TRR' && updatingItem.id === trr['id'].toString()
});

export const pinnedOfficersSelector = createSelector(
  getPinnedOfficers,
  pinItemFromPreviewPane,
  (officers, updatingItem) => map(officers, officer => officerPinnedTransform(officer, updatingItem))
);

export const pinnedCRsSelector = createSelector(
  getPinnedCRs,
  pinItemFromPreviewPane,
  (crs, updatingItem) => map(crs, cr => crPinnedTransform(cr, updatingItem))
);

export const pinnedTRRsSelector = createSelector(
  getPinnedTRRs,
  pinItemFromPreviewPane,
  (trrs, updatingItem) => map(trrs, trr => trrPinnedTransform(trr, updatingItem))
);

export const getPinnedOfficersRequesting = state => state.pinboardPage.officerItems.requesting;
export const getPinnedCRsRequesting = state => state.pinboardPage.crItems.requesting;
export const getPinnedTRRsRequesting = state => state.pinboardPage.trrItems.requesting;
