import { createSelector } from 'reselect';

import { relevantCoaccusalTransform } from './transform';
import extractQuery from 'utils/extract-query';

const getRelevantCoaccusalsPagination = state => state.pinboardPage.relevantCoaccusals;

export const relevantCoaccusalsSelector = createSelector(
  getRelevantCoaccusalsPagination,
  ({ items }) => items.map(relevantCoaccusalTransform)
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
