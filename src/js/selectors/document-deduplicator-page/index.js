import { createSelector } from 'reselect';
import { map } from 'lodash';
import moment from 'moment';

import * as constants from 'utils/constants';

const getTrackerDocuments = state => state.documentDeduplicatorPage.documents;

export const documentsSelector = createSelector(
  getTrackerDocuments,
  (documents) => map(documents, (doc) => ({
    id: doc.id,
    title: doc.title,
    thumbnail: doc['preview_image_url'],
    source: constants.DOCUMENT_SOURCE_MAP[doc['source_type']],
    date: moment(doc['created_at']).format('MMM D, YYYY'),
    viewsCount: doc['views_count'],
    downloadsCount: doc['downloads_count'],
    show: doc.show
  }))
);
