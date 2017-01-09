import { createSelector } from 'reselect';
import { map } from 'lodash';

import { getField, convertContentStateToEditorState } from 'utils/draft';


const getFAQs = state => state.faqs;

export const faqTransform = faq => {
  return {
    id: faq.id,
    fieldProps: {
      'answer': {
        value: convertContentStateToEditorState(getField(faq.fields, 'answer').value),
        editModeOn: false,
        onChange: () => {}
      },
      'question': {
        value: convertContentStateToEditorState(getField(faq.fields, 'question').value),
        editModeOn: false,
        onChange: () => {}
      }
    }
  };
};

export const faqsSelector = createSelector(getFAQs, faqs => map(faqs, faq => faqTransform(faq)));
