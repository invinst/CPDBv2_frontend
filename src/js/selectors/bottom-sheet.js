import { createSelector } from 'reselect';
import { find } from 'lodash';

import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';
import {
  getField, createFieldWithEmptyEditorState, createEmptyStringField,
  createEmptyDateField
} from 'utils/draft';


const getReports = state => state.reports;
const getFAQs = state => state.faqs;
const getContentId = (state, props) => props.content.id;

export const reportSelector = createSelector(
  getReports,
  getContentId,
  (reports, id) => {
    const report = find(reports, report => report.id === parseInt(id));
    return {
      id: id !== 'new' ? id : null,
      fields: (
        id === 'new' ?
        {
          'title': createFieldWithEmptyEditorState('title', 'plain_text'),
          'publication': createEmptyStringField('publication'),
          'publish_date': createEmptyDateField('publish_date'),
          'author': createEmptyStringField('author'),
          'excerpt': createFieldWithEmptyEditorState('excerpt', 'multiline_text'),
          'article_link': createFieldWithEmptyEditorState('article_link', 'rich_text')
        } :
          report ?
          {
            'title': getField(report.fields, 'title'),
            'publication': getField(report.fields, 'publication'),
            'publish_date': getField(report.fields, 'publish_date'),
            'author': getField(report.fields, 'author'),
            'excerpt': getField(report.fields, 'excerpt'),
            'article_link': getField(report.fields, 'article_link')
          } :
          null
      )
    };
  }
);

export const faqSelector = createSelector(
  getFAQs,
  getContentId,
  (faqs, id) => {
    const faq = find(faqs, faq => faq.id === parseInt(id));
    return {
      id: id !== 'new' ? id : null,
      fields: (
        id === 'new' ?
        {
          'question': createFieldWithEmptyEditorState('question', 'plain_text'),
          'answer': createFieldWithEmptyEditorState('answer', 'multiline_text')
        } :
          faq ?
          {
            'question': getField(faq.fields, 'question'),
            'answer': getField(faq.fields, 'answer')
          } :
          null
      )
    };
  }
);

export const contentSelector = (state, props) => {
  const { content } = props;
  if (!content) {
    return null;
  }

  let childrenProps;

  if (content.type === REPORT_TYPE) {
    childrenProps = reportSelector(state, props);
  }

  if (content.type === FAQ_TYPE) {
    childrenProps = faqSelector(state, props);
  }

  return {
    type: content.type,
    props: childrenProps
  };
};
