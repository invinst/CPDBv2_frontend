import { createSelector } from 'reselect';
import { get } from 'lodash';

import { getPaginationInfo } from 'selectors/common/pagination-selector';
import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';
import { mediaUrl } from 'utils/static-assets';


const getIsRequesting = state => state.landingPage.storyApp.isRequesting;

const getStories = state => state.landingPage.storyApp.stories;

export const getImageUrl = story => (
  (get(story, `image_url.${DEFAULT_IMAGE_DIMENSION}`) && mediaUrl(story['image_url'][DEFAULT_IMAGE_DIMENSION])) || ''
);

export function rawStoryTransform(story) {
  return {
    id: story.id,
    title: story.title,
    canonicalUrl: story['canonical_url'],
    newspaperName: story.newspaper && story.newspaper.name,
    newspaperShortName: story.newspaper && story.newspaper['short_name'],
    date: story['post_date'],
    paragraphs: story.body && story.body.map(p => p.value),
    imageUrl: getImageUrl(story)
  };
}

export const getStoriesSelector = createSelector(getStories, (stories) => {
  return stories.results.map(rawStoryTransform);
});

export const paginationSelector = createSelector(getStories, getPaginationInfo);

export const imageStorySelector = createSelector(
  getStoriesSelector,
  (stories) => {
    let imageStory = stories.find(story => !!story['imageUrl']);
    return imageStory ? imageStory : stories[0];
  }
);

export const noImageStoriesSelector = createSelector(
  getStoriesSelector,
  imageStorySelector,
  (stories, imageStory) => {
    let noImageStories = stories.filter(story => story.id !== imageStory.id);
    return noImageStories.slice(0, 2);
  }
);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  getStoriesSelector,
  (isRequesting, stories) => {
    return !isRequesting && stories.length >= 3;
  }
);
