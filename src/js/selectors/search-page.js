import { createSelector } from 'reselect';
import { omitBy, isEmpty, keys, pick, indexOf, sortBy } from 'lodash';


const SEARCH_CATEGORIES = ['OFFICER', 'CO-ACCUSED', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT'];

const getSuggestionGroups = (state) => (state.searchPage.suggestionGroups);
const getSuggestionTags = (state) => (state.searchPage.tags);

export const suggestionGroupsSelector = createSelector(
  getSuggestionGroups,
  (suggestionGroups) => (
    pick(omitBy(suggestionGroups, isEmpty), SEARCH_CATEGORIES)
  )
);

export const suggestionTagsSelector = createSelector(
  getSuggestionTags,
  (suggestionTags) => (
    sortBy(suggestionTags, (tag) => (indexOf(SEARCH_CATEGORIES, tag))
  )
));

export const isEmptySelector = createSelector(
  suggestionGroupsSelector,
  (suggestionGroups) => (
    !keys(suggestionGroups).length
  )
);
