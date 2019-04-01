import { createSelector } from 'reselect';

import { extractPercentile } from 'selectors/common/percentile';
import extractQuery from 'utils/extract-query';

const getRelevantCoaccusalsPagination = state => state.pinboardPage.relevantCoaccusals;

const relevantCoaccusalTransform = coaccusal => ({
  id: coaccusal.id,
  rank: coaccusal.rank,
  fullName: coaccusal['full_name'],
  coaccusalCount: coaccusal['coaccusal_count'],
  percentile: extractPercentile(coaccusal.percentile),
});

export const relevantCoaccusalsSelector = createSelector(
  getRelevantCoaccusalsPagination,
  ({ coaccusals }) => coaccusals.items.map(relevantCoaccusalTransform)
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
