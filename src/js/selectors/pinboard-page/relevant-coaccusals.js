import { createSelector } from 'reselect';

import { extractPercentile } from 'selectors/common/percentile';

const getRelevantCoaccusals = state => state.pinboardPage.relevantCoaccusals || [];

const relevantCoaccusalTransform = coaccusal => ({
  id: coaccusal.id,
  rank: coaccusal.rank,
  fullName: coaccusal['full_name'],
  coaccusalCount: coaccusal['coaccusal_count'],
  percentile: extractPercentile(coaccusal.percentile),
});

export const relevantCoaccusalsSelector = createSelector(
  getRelevantCoaccusals,
  coaccusals => coaccusals.map(relevantCoaccusalTransform)
);
