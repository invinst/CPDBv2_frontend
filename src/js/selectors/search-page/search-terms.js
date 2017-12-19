import { createSelector } from 'reselect';
import { map } from 'lodash';

const searchTermsSelector = state => state.searchPage.searchTerms;

export const hiddenSelector = createSelector(searchTermsSelector, searchTerms => searchTerms.hidden);

export const navigationItemsSelector = createSelector(
  searchTermsSelector, searchTerms => map(searchTerms.categories, 'name')
);

export const categoriesSelector = createSelector(
  searchTermsSelector, searchTerms => searchTerms.categories
);

export const selectedCategoryIndexSelector = createSelector(
  searchTermsSelector, searchTerms => searchTerms.selectedCategory
);
