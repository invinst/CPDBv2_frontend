import { createSelector } from 'reselect';


export const searchTermsSelector = state => state.searchPage.searchTerms;
export const hiddenSelector = createSelector(searchTermsSelector, searchTerms => searchTerms.hidden);
export const categoriesSelector = createSelector(
  searchTermsSelector, searchTerms => searchTerms.categories
);

