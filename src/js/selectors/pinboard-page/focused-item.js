import { createSelector } from 'reselect';
import { get, concat, keyBy, isEmpty, each, map } from 'lodash';

import {
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
} from './items';
import { previewPaneTransform } from 'selectors/common/preview-pane-transforms';


const focusedItem = state => state.pinboardPage.focusedItem;

const getRelevantComplaints = state => state.pinboardPage.relevantComplaints.items;
const getRelevantCoaccusals = state => state.pinboardPage.relevantCoaccusals.items;
const getRelevantDocuments = state => state.pinboardPage.relevantDocuments.items;

const allItemsSelector = createSelector(
  getPinnedCRs,
  getPinnedTRRs,
  getPinnedOfficers,
  getRelevantComplaints,
  getRelevantCoaccusals,
  getRelevantDocuments,
  (pinnedCRs, pinnedTRRs, pinnedOfficers, relevantCRs, relevantOfficers, relevantDocuments) => {
    each(pinnedCRs, cr => cr.isPinned = true);
    each(pinnedTRRs, trr => trr.isPinned = true);
    each(pinnedOfficers, officer => officer.isPinned = true);
    each(relevantCRs, cr => cr.isPinned = false);
    each(relevantOfficers, officer => officer.isPinned = false);
    const relevantDocumentsCRs = map(relevantDocuments, document => document.allegation);

    return {
      'CR': keyBy(concat(pinnedCRs, relevantDocumentsCRs, relevantCRs), item => item.crid),
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
