import { createSelector } from 'reselect';

import storySelector from './story-selector';


const getStories = state => state.storiesPage.stories;

const getIsRequesting = state => state.storiesPage.isRequesting;

export const storiesSelector = createSelector(
  getStories,
  (stories) => {
    return stories.map(storySelector).slice(0, 15);
  }
);

export const paginationSelector = state => state.storiesPage.pagination;

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  storiesSelector,
  (isRequesting, stories) => {
    return !isRequesting && stories.length >= 1;
  }
);

export const moreDataAvailableSelector = state => !state.storiesPage.isLoadingMore;
