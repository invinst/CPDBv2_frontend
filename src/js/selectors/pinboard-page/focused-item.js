import { createSelector } from 'reselect';
import { get, concat, keyBy, isEmpty, each } from 'lodash';

import {
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
} from './items';
import { previewPaneTransform } from 'selectors/common/preview-pane-transforms';


const focusedItem = state => state.pinboardPage.focusedItem;

const getRelevantComplaints = state => state.pinboardPage.relevantComplaints.items;
const getRelevantCoaccusals = state => state.pinboardPage.relevantCoaccusals.items;

const allItemsSelector = createSelector(
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
  getRelevantComplaints,
  getRelevantCoaccusals,
  (pinnedCRs, pinnedTRRs, pinnedOfficers, relevantCRs, relevantOfficers) => {
    each(pinnedCRs, cr => cr.isPinned = true);
    each(pinnedTRRs, trr => trr.isPinned = true);
    each(pinnedOfficers, officer => officer.isPinned = true);
    each(relevantCRs, cr => cr.isPinned = false);
    each(relevantOfficers, officer => officer.isPinned = false);

    return {
      'CR': keyBy(concat(pinnedCRs, relevantCRs), item => item.crid),
      'TRR': keyBy(pinnedTRRs, item => item.id.toString()),
      'OFFICER': keyBy(concat(pinnedOfficers, relevantOfficers), item => item.id.toString()),
    };
  }
);

export const focusedItemSelector = createSelector(
  focusedItem,
  allItemsSelector,
  (item, allItems) => {
    const focusedItem = get(allItems, `${item.type}.${item.id}`, {});
    return isEmpty(focusedItem) ?
      focusedItem :
      previewPaneTransform({ ...focusedItem, type: item.type });
  }
);
