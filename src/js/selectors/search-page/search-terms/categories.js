import { createSelector } from 'reselect';


export const searchTermsSelector = state => state.searchPage.searchTerms;
export const categoriesSelector = createSelector(
  searchTermsSelector, searchTerms => searchTerms.categories
);
