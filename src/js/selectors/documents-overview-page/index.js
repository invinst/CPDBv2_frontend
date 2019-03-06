import { createSelector } from 'reselect';
import * as _ from 'lodash';
import moment from 'moment';

import * as constants from 'utils/constants';
import extractQuery from 'utils/extract-query';

const getTrackerDocuments = state => state.documentsOverviewPage.documents.data;
const getPagination = state => state.documentsOverviewPage.pagination;
export const getDocumentsOrder = state => state.documentsOverviewPage.documentsOrder.data;
export const getMatchParamater = state => state.documentsOverviewPage.documents.match;

export const documentsSelector = createSelector(
  getTrackerDocuments,
  getDocumentsOrder,
  (documents, orders) => {
    const results = [];
    let prevDate = null;
    _.each(orders, (id) => {
      const doc = documents[id];
      const date = moment(doc['created_at']);
      if (prevDate === null || date.month() !== prevDate.month() || date.year() !== prevDate.year()) {
        results.push({
          kind: constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR,
          text: date.format('MMM YYYY'),
          id: date.format('MM-YYYY')
        });
      }
      prevDate = date;
      results.push({
        id: doc.id,
        kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
        title: doc.title,
        thumbnail: doc['preview_image_url'],
        source: constants.DOCUMENT_SOURCE_MAP[doc['source_type']],
        date: date.format('MMM DD'),
        viewsCount: doc['views_count'],
        downloadsCount: doc['downloads_count'],
        documentsCount: parseInt(doc['documents_count']) - 1,
        crid: doc['crid'],
        fileType: doc['file_type'],
        url: doc['url'],
      });
    });
    return results;
  }
);

export const hasMoreSelector = createSelector(
  getPagination,
  ({ next }) => (!!next)
);

export const nextParamsSelector = createSelector(
  getPagination,
  ({ next }) => (extractQuery(next))
);
