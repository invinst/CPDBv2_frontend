import { createSelector } from 'reselect';
import { find } from 'lodash';

import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';
import {
  getField, createFieldWithEmptyEditorState, createEmptyStringField,
  createEmptyDateField
} from 'utils/draft';


const getReports = state => state.reports;
const getContentId = state => state.bottomSheet.content.id;
const getFAQs = state => state.faqs;

const reportSelector = createSelector(
  getReports,
  getContentId,
  (stories, id) => {
    const report = find(stories, report => report.id === id);
    return {
      id,
      fields: (
        report ?
        {
          'title': getField(report.fields, 'title'),
          'publication': getField(report.fields, 'publication'),
          'publish_date': getField(report.fields, 'publish_date'),
          'author': getField(report.fields, 'author'),
          'excerpt': getField(report.fields, 'excerpt')
        } :
        {
          'title': createFieldWithEmptyEditorState('title', 'plain_text'),
          'publication': createEmptyStringField('publication'),
          'publish_date': createEmptyDateField('publish_date'),
          'author': createEmptyStringField('author'),
          'excerpt': createFieldWithEmptyEditorState('excerpt', 'multiline_text')
        }
      )
    };
  }
);

const faqSelector = createSelector(
  getFAQs,
  getContentId,
  (faqs, id) => {
    const faq = find(faqs, faq => faq.id === id);
    return {
      id,
      fields: {
        'question': faq ?
          getField(faq.fields, 'question') :
          createFieldWithEmptyEditorState('question', 'plain_text'),
        'answer': faq ?
          getField(faq.fields, 'answer') :
          createFieldWithEmptyEditorState('answer', 'multiline_text')
      }
    };
  }
);

export const contentSelector = (state) => {
  if (!state.bottomSheet.content) {
    return null;
  }

  const contentType = state.bottomSheet.content.type;
  let props;

  if (contentType === REPORT_TYPE) {
    props = reportSelector(state);
  }

  if (contentType === FAQ_TYPE) {
    props = faqSelector(state);
  }

  return {
    type: contentType,
    props
  };
};
