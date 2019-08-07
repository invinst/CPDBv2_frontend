import { createSelector } from 'reselect';
import { getQuery } from 'selectors/search-page/search-results/suggestion-groups';


export const hiddenSelector = createSelector(
  getQuery,
  query => query !== ''
);


