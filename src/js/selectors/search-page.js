import { createSelector } from 'reselect';
import { omitBy, isEmpty, keys, pick, indexOf, sortBy, map, chunk, flatten } from 'lodash';


const SEARCH_CATEGORIES = ['OFFICER', 'CO-ACCUSED', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT', 'UNIT > OFFICERS'];

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

export const suggestionColumnsSelector = createSelector(
  suggestionGroupsSelector,
  (suggestionGroups) => (
    flatten(
      map(suggestionGroups, (suggestions) => (
        map(chunk(suggestions, 10), (columns) => (columns.length))
      ))
    )
));
