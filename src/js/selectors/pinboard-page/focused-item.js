import { createSelector } from 'reselect';
import { get, concat, keyBy, isEmpty } from 'lodash';

import {
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
} from './items';
import { getRelevantComplaintsPagination } from './relevant-complaints';
import { getRelevantCoaccusalsPagination } from './relevant-coaccusals';
import { previewPaneTransform } from 'selectors/search-page/search-results/transforms';


const focusedItem = state => state.pinboardPage.focusedItem;

const allItemsSelector = createSelector(
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
  getRelevantComplaintsPagination,
  getRelevantCoaccusalsPagination,
  (pinnedCRs, pinnedTRRs, pinnedOfficers, relevantCRs, relevantOfficers) => ({
    'CR': keyBy(concat(pinnedCRs, relevantCRs.items), item => item.crid),
    'TRR': keyBy(pinnedTRRs, item => item.id.toString()),
    'OFFICER': keyBy(concat(pinnedOfficers, relevantOfficers.items), item => item.id.toString()),
  })
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
