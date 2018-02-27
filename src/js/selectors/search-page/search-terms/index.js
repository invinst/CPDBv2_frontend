import { createSelector } from 'reselect';
import { searchTermsSelector } from 'selectors/search-page/search-terms/categories';


export const hiddenSelector = createSelector(searchTermsSelector, searchTerms => searchTerms.hidden);


