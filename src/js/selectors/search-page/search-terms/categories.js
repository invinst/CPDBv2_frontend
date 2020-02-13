import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';


export const getCategories = state => get(state, 'searchPage.searchTerms.categories', []);

export const hasCategoriesSelector = createSelector(
  getCategories, categories => !isEmpty(categories)
);
