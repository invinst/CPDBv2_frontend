import { createSelector } from 'reselect';
import { find } from 'lodash';

import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';
import { getField } from 'utils/draft';


const getStories = state => state.reports;
const getContentId = state => state.bottomSheet.content.id;
const getFAQs = state => state.faqs;

const storySelector = createSelector(
  getStories,
  getContentId,
  (stories, id) => {
    const story = find(stories, story => story.id === id);
    return {
      id,
      fields: {
        'title': getField(story.fields, 'title'),
        'publication': getField(story.fields, 'publication'),
        'publish_date': getField(story.fields, 'publish_date'),
        'author': getField(story.fields, 'author'),
        'excerpt': getField(story.fields, 'excerpt')
      }
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
        'question': getField(faq.fields, 'question'),
        'answer': getField(faq.fields, 'answer')
      }
    };
  }
);

export default (state) => {
  if (!state.bottomSheet.content) {
    return null;
  }

  const contentType = state.bottomSheet.content.type;
  let props;

  if (contentType === REPORT_TYPE) {
    props = storySelector(state);
  }

  if (contentType === FAQ_TYPE) {
    props = faqSelector(state);
  }

  return {
    type: contentType,
    props
  };
};
