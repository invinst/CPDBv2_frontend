import { createSelector } from 'reselect';
import { map } from 'lodash';

import extractQuery from 'utils/extract-query';
import { relevantDocumentTransform } from './transform';
import { pinboardICRIDsSelector } from 'selectors/pinboard-page/pinboard';

const getRelevantDocumentsPagination = state => state.pinboardPage.relevantDocuments;
const pinItemFromPreviewPane = state => state.pinboardPage.pinItemFromPreviewPane;
export const getRequesting = state => state.pinboardPage.relevantDocuments.requesting;

export const relevantDocumentsSelector = createSelector(
  getRelevantDocumentsPagination,
  pinboardICRIDsSelector,
  pinItemFromPreviewPane,
  ({ items }, crids, updatingItem) => map(items, item => relevantDocumentTransform(item, crids, updatingItem))
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
