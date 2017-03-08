import { createSelector } from 'reselect';

import {
  getField, createFieldWithEmptyEditorState
} from 'utils/draft';


const getFAQs = state => state.faqs;
const getId = (state, props) => props.id;

export const faqSelector = createSelector(
  getFAQs,
  getId,
  (faqs, id) => {
    const faq = faqs[parseInt(id)];
    return {
      id: id !== 'new' ? id : null,
      fields: (
        id === 'new' ?
        {
          'question': createFieldWithEmptyEditorState('question', 'rich_text'),
          'answer': createFieldWithEmptyEditorState('answer', 'rich_text')
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
