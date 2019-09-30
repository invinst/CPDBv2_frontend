import { createSelector } from 'reselect';
import { getQuery } from 'selectors/search-page/common';


export const hiddenSelector = createSelector(
  getQuery,
  query => query !== ''
);

