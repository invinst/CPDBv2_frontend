import { createSelector } from 'reselect';
import { find } from 'lodash';

import { REPORT_TYPE } from 'actions/bottom-sheet';
import { getContentStateFromFields } from 'utils/draft';


const getStories = state => state.storiesPage.stories;
const getStoryId = state => state.bottomSheet.content.id;

const storySelector = createSelector(
  getStories,
  getStoryId,
  (stories, id) => {
    const story = find(stories, story => story.id === id);
    return {
      id,
      fields: {
        'title': getContentStateFromFields(story.fields, 'title'),
        'publication': getContentStateFromFields(story.fields, 'publication'),
        'publish_date': getContentStateFromFields(story.fields, 'publish_date'),
        'author': getContentStateFromFields(story.fields, 'author'),
        'excerpt': getContentStateFromFields(story.fields, 'excerpt')
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

  return {
    type: contentType,
    props
  };
};
