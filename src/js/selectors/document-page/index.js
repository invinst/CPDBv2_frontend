import { createSelector } from 'reselect';
import moment from 'moment';


const getData = state => state.documentPage.data;
export const getTitleEditModeOn = state => state.documentPage.titleEditModeOn;
export const getTextContentEditModeOn = state => state.documentPage.textContentEditModeOn;

export const documentSelector = createSelector(
  [getData],
  (data) => ({
    attachmentId: data.id,
    title: data.title,
    fullText: data['text_content'],
    url: data.url,
    previewImageUrl: data['preview_image_url'],
    crid: data.crid,
    source: data['original_url'],
    crawlerName: data['crawler_name'],
    downloadCount: data['downloads_count'],
    viewCount: data['views_count'],
    notificationCount: data['notifications_count'],
    pageCount: data['pages'] || 0,
    createdAt: moment(data['created_at']).format('MMM D, YYYY'),
    linkedDocuments: (data['linked_documents'] || []).map(
      linkedDocument => ({
        id: linkedDocument.id,
        previewImageUrl: linkedDocument['preview_image_url'],
      })
    ),
    lastEditedDateTime: (
      `at ${moment(data['updated_at']).format('hh:mmA')} 
      on ${moment(data['updated_at']).format('MMM D, YYYY')}`
    ),
  })
);
