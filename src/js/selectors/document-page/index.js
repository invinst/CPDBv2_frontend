import { createSelector } from 'reselect';


const getData = state => state.documentPage.data;

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
    pageCount: data['pages_count'] || 0,
    createdAt: data['created_at'],
    linkedDocuments: (data['linked_documents'] || []).map(
      linkedDocument => ({
        id: linkedDocument.id,
        previewImageUrl: linkedDocument['preview_image_url'],
      })
    ),
    lastEditedDateTime: data['updated_at'],
  })
);
