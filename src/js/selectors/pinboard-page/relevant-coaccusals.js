import { createSelector } from 'reselect';
import { map } from 'lodash';

import { relevantCoaccusalTransform } from './transform';
import extractQuery from 'utils/extract-query';

export const getRelevantCoaccusalsPagination = state => state.pinboardPage.relevantCoaccusals;
const pinItemFromPreviewPane = state => state.pinboardPage.pinItemFromPreviewPane;
export const getRequesting = state => state.pinboardPage.relevantCoaccusals.requesting;

export const relevantCoaccusalsSelector = createSelector(
  getRelevantCoaccusalsPagination,
  pinItemFromPreviewPane,
  ({ items }, updatingItem) => map(items, item => relevantCoaccusalTransform(item, updatingItem))
);

const relevantCoaccusalsCountSelector = createSelector(
  getRelevantCoaccusalsPagination,
  ({ count }) => count
);


export const relevantCoaccusalsNextParamsSelector = createSelector(
  getRelevantCoaccusalsPagination,
  ({ pagination }) => {
    return extractQuery(pagination.next);
  }
);

export const relevantCoaccusalsHasMoreSelector = createSelector(
  relevantCoaccusalsCountSelector,
  relevantCoaccusalsSelector,
  (count, coaccusals) => coaccusals.length < count
);
