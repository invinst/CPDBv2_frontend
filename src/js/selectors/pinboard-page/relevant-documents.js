import { createSelector } from 'reselect';

import extractQuery from 'utils/extract-query';
import { relevantDocumentTransform } from './transform';

const getRelevantDocumentsPagination = state => state.pinboardPage.relevantDocuments;

export const relevantDocumentsSelector = createSelector(
  getRelevantDocumentsPagination,
  ({ items }) => items.items.map(relevantDocumentTransform)
);

const relevantDocumentsCountSelector = createSelector(
  getRelevantDocumentsPagination,
  ({ count }) => count
);


export const relevantDocumentsNextParamsSelector = createSelector(
  getRelevantDocumentsPagination,
  ({ pagination }) => {
    return extractQuery(pagination.next);
  }
);

export const relevantDocumentsHasMoreSelector = createSelector(
  relevantDocumentsCountSelector,
  relevantDocumentsSelector,
  (count, documents) => documents.length < count
);
