import { createSelector } from 'reselect';

import extractQuery from 'utils/extract-query';
import { relevantComplaintTransform } from './transform';

const getRelevantComplaintsPagination = state => state.pinboardPage.relevantComplaints;

export const relevantComplaintsSelector = createSelector(
  getRelevantComplaintsPagination,
  ({ items }) => items.map(relevantComplaintTransform)
);

const relevantComplaintsCountSelector = createSelector(
  getRelevantComplaintsPagination,
  ({ count }) => count
);


export const relevantComplaintsNextParamsSelector = createSelector(
  getRelevantComplaintsPagination,
  ({ pagination }) => {
    return extractQuery(pagination.next);
  }
);

export const relevantComplaintsHasMoreSelector = createSelector(
  relevantComplaintsCountSelector,
  relevantComplaintsSelector,
  (count, complaints) => complaints.length < count
);
