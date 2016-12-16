import { createSelector } from 'reselect';
import { omitBy, isEmpty, keys } from 'lodash';


const getSuggestionGroups = (state) => (state.searchPage.suggestionGroups);

export const suggestionGroupsSelector = createSelector(
  getSuggestionGroups,
  (suggestionGroups) => (
    omitBy(suggestionGroups, isEmpty)
  )
);

export const isEmptySelector = createSelector(
  suggestionGroupsSelector,
  (suggestionGroups) => (
    !keys(suggestionGroups).length
  )
);
