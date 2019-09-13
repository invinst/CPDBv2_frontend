import { createSelector } from 'reselect';
import { map } from 'lodash';

import extractQuery from 'utils/extract-query';
import { relevantComplaintTransform } from './transform';

export const getRelevantComplaintsPagination = state => state.pinboardPage.relevantComplaints;
const pinItemFromPreviewPane = state => state.pinboardPage.pinItemFromPreviewPane;
export const getRequesting = state => state.pinboardPage.relevantComplaints.requesting;

export const relevantComplaintsSelector = createSelector(
  getRelevantComplaintsPagination,
  pinItemFromPreviewPane,
  ({ items }, updatingItem) => map(items, item => relevantComplaintTransform(item, updatingItem))
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
