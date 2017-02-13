import { createSelector } from 'reselect';
import { map, sortBy, values } from 'lodash';

import { getField, convertContentStateToEditorState } from 'utils/draft';


const getFAQs = state => state.faqs;

export const faqTransform = faq => {
  return {
    id: faq.id,
    meta: faq.meta,
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

export const faqsSelector = createSelector(getFAQs, faqs => {
  const result = map(
    sortBy(values(faqs), faq => -faq.meta.order),
    faq => faqTransform(faq)
  );
  return result;
});
