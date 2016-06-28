import { chunk, includes } from 'lodash';
import { createSelector } from 'reselect';

import { getPaginationInfo } from 'selectors/common/pagination-selector';
import { rawStoryTransform } from 'selectors/landing-page/stories-selector';


const getStories = state => state.storiesPage.stories;

const getIsRequesting = state => state.storiesPage.isRequesting;

const storiesSelector = createSelector(getStories, (stories) => {
  return stories.results.map(rawStoryTransform);
});

export function groupFeaturedStories(stories) {
  let imageStory = stories.find(story => !!story.imageUrl) || stories[0];
  let noImageStories = stories.filter(story => story.id != imageStory.id);

  return {
    imageStory,
    noImageStories
  };
}

export const featuredStoriesSelector = createSelector(
  storiesSelector,
  (stories) => {
    return stories.filter(story => story.isFeatured).slice(0, 6);
  }
);

export const featuredStoryGroupsSelector = createSelector(
  featuredStoriesSelector,
  (stories) => {
    let storyChunks = chunk(stories, 3);

    return storyChunks.map(groupFeaturedStories);
  }
);

export const nonFeaturedStoriesSelector = createSelector(
  storiesSelector,
  featuredStoriesSelector,
  (stories, featuredStories) => {
    const featuredStoryIds = featuredStories.map(story => story.id);
    const nonFeaturedStories = stories.filter(story => !includes(featuredStoryIds, story.id));

    return nonFeaturedStories;
  }
);

export const paginationSelector = createSelector(getStories, getPaginationInfo);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  featuredStoriesSelector,
  (isRequesting, stories) => {
    return !isRequesting && stories.length >= 6;
  }
);
