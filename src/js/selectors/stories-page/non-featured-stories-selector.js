import { createSelector } from 'reselect';

import { getPaginationInfo } from 'selectors/common/pagination-selector';
import { rawStoryTransform } from 'selectors/landing-page/stories-selector';


const getStories = state => state.storiesPage.nonFeaturedStories.stories;

const getIsRequesting = state => state.storiesPage.nonFeaturedStories.isRequesting;

export const nonFeaturedStoriesSelector = createSelector(getStories, (stories) => {
  return stories.results.map(rawStoryTransform);
});

export const paginationSelector = createSelector(getStories, getPaginationInfo);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  nonFeaturedStoriesSelector,
  (isRequesting, stories) => {
    return !isRequesting && stories.length > 0;
  }
);
