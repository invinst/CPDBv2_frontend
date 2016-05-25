import { createSelector } from 'reselect';

import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';


const getIsRequesting = state => state.storyApp.isRequesting;

const getStories = state => state.storyApp.stories;

const getFeaturedStoryId = state => state.storyApp.featuredStoryId;

export function rawStoryTransform(story) {
  return {
    id: story.id,
    title: story.title,
    newspaperTitle: story.newspaper && story.newspaper.title,
    date: story['post_date'],
    paragraphs: story.body && story.body.map(p => p.value),
    imageUrl: story['image_url'] && story['image_url'][DEFAULT_IMAGE_DIMENSION]
  };
}

export const getStoriesSelector = createSelector(getStories, (stories) => {
  return stories.map(rawStoryTransform);
});

export const featuredStorySelector = createSelector(
  getStoriesSelector,
  getFeaturedStoryId,
  (stories, featuredStoryId) => {
    let featuredStory = stories.find(story => story.id === featuredStoryId);
    return featuredStory ? featuredStory : stories[0];
  }
);

export const smallStoriesSelector = createSelector(
  getStoriesSelector,
  featuredStorySelector,
  (stories, featureStory) => {
    let smallStories = stories.filter(story => story.id !== featureStory.id);
    return smallStories.slice(0, 2);
  }
);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  getStoriesSelector,
  (isRequesting, stories) => {
    return !isRequesting && stories.length >= 3;
  }
);
