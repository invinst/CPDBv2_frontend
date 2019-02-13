import { createSelector } from 'reselect';
import { map } from 'lodash';
import moment from 'moment';

import extractQuery from 'utils/extract-query';

const getTrackerDocuments = state => state.tracker.documents;
const getPagination = state => state.tracker.pagination;

const sourceMap = {
  DOCUMENTCLOUD: 'https://www.documentcloud.org/',
  COPA: 'https://www.chicagocopa.org/',
  COPA_DOCUMENTCLOUD: 'https://www.chicagocopa.org/',
};

export const documentsSelector = createSelector(
  getTrackerDocuments,
  documents => map(documents, doc => ({
    id: doc.id,
    title: doc.title,
    thumbnail: doc['preview_image_url'],
    source: sourceMap[doc['source_type']],
    date: moment(doc['created_at']).format('MMM D, YYYY')
  })));

export const hasMoreSelector = createSelector(
  getPagination,
  ({ next }) => (!!next)
);

export const nextParamsSelector = createSelector(
  getPagination,
  ({ next }) => (extractQuery(next))
);
