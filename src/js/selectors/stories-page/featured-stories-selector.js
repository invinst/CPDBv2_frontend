import { createSelector } from 'reselect';

import { getPaginationInfo } from 'selectors/common/pagination-selector';
import { rawStoryTransform } from 'selectors/landing-page/stories-selector';


const getStories = state => state.storiesPage.featuredStories.stories;

const getIsRequesting = state => state.storiesPage.featuredStories.isRequesting;

export const featuredStoriesSelector = createSelector(
  getStories,
  (stories) => {
    return stories.results.map(rawStoryTransform).slice(0, 15);
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
