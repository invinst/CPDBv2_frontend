import { createSelector } from 'reselect';
import { map } from 'lodash';
import moment from 'moment';

import * as constants from 'utils/constants';
import extractQuery from 'utils/extract-query';

const getTrackerDocuments = state => state.documentDeduplicatorPage.documents.data;
const getPagination = state => state.documentDeduplicatorPage.pagination;
const getDocumentsOrder = state => state.documentDeduplicatorPage.documentsOrder.data;
export const getCRIDParameter = state => state.documentDeduplicatorPage.documents.crid;

export const documentsSelector = createSelector(
  getTrackerDocuments,
  getDocumentsOrder,
  (documents, orders) => map(orders, (id) => {
    const doc = documents[id];
    return {
      id: doc.id,
      title: doc.title,
      thumbnail: doc['preview_image_url'],
      source: constants.DOCUMENT_SOURCE_MAP[doc['source_type']],
      date: moment(doc['created_at']).format('MMM D, YYYY'),
      viewsCount: doc['views_count'],
      downloadsCount: doc['downloads_count'],
      show: doc.show,
      fileType: doc['file_type'],
      url: doc['url'],
    };
  })
);

export const hasMoreSelector = createSelector(
  getPagination,
  ({ next }) => (!!next)
);

export const nextParamsSelector = createSelector(
  getPagination,
  ({ next }) => (extractQuery(next))
);
