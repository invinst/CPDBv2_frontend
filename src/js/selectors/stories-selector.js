import { createSelector } from 'reselect';

const getIsRequesting = state => state.storyApp.isRequesting;

const getStories = state => state.storyApp.stories;

const getFeaturedStoryId = state => state.storyApp.featuredStoryId;

export const featuredStorySelector = createSelector(
  getStories,
  getFeaturedStoryId,
  (stories, featuredStoryId) => {
    let featuredStory = stories.find(story => story.id === featuredStoryId);
    return featuredStory ? featuredStory : stories[0];
  }
);

export const smallStoriesSelector = createSelector(
  getStories,
  featuredStorySelector,
  (stories, featureStory) => {
    let smallStories = stories.filter(story => story.id !== featureStory.id);
    return smallStories.slice(0, 2);
  }
);

export const shouldRenderSelector = createSelector(
  getIsRequesting,
  getStories,
  (isRequesting, stories) => {
    return !isRequesting && stories.length >= 3;
  }
);
