import { createSelector } from 'reselect';
import moment from 'moment';
import { isUndefined } from 'lodash';


const getData = state => state.documentPage.data;
export const getTitleEditModeOn = state => state.documentPage.titleEditModeOn;
export const getTextContentEditModeOn = state => state.documentPage.textContentEditModeOn;

export const documentSelector = createSelector(
  [getData],
  (data) => {
    const infoItems = [
      { name: 'CRID / UID', value: `CR ${ data.crid }`, to: `/complaint/${data.crid}/` },
      { name: 'Source', value: data['original_url'], url: data['original_url'] },
      { name: 'Crawler', value: data['crawler_name'] },
      { name: 'Date', value: moment(data['created_at']).format('MMM D, YYYY') },
    ];

    if (!isUndefined(data['views_count'])) {
      infoItems.push({ name: 'Views', value: data['views_count'].toLocaleString() });
    }
    if (!isUndefined(data['downloads_count'])) {
      infoItems.push({ name: 'Downloads', value: data['downloads_count'].toLocaleString() });
    }
    if (!isUndefined(data['notifications_count'])) {
      infoItems.push({ name: 'Notifications', value: data['notifications_count'].toLocaleString() });
    }

    return {
      attachmentId: data.id,
      title: data.title,
      fullText: data['text_content'],
      url: data.url,
      previewImageUrl: data['preview_image_url'],
      crid: data.crid,
      pageCount: data['pages'] || 0,
      lastUpdatedBy: data['last_updated_by'],
      linkedDocuments: (data['linked_documents'] || []).map(
        linkedDocument => ({
          id: linkedDocument.id,
          previewImageUrl: linkedDocument['preview_image_url'],
        })
      ),
      lastEditedDateTime: (
        `at ${ moment(data['updated_at']).format('hh:mmA') } on ${ moment(data['updated_at']).format('MMM D, YYYY') }`
      ),
      infoItems: infoItems,
    };
  }
);