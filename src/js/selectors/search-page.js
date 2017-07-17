import { createSelector } from 'reselect';
import { omitBy, isEmpty, keys, pick, indexOf, sortBy, chunk, flatten } from 'lodash';


const SEARCH_CATEGORIES = ['OFFICER', 'CO-ACCUSED', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT', 'UNIT > OFFICERS'];

const getSuggestionGroups = (state) => (state.searchPage.suggestionGroups);
const getSuggestionTags = (state) => (state.searchPage.tags);
const getSuggestionNavigation = state => state.searchPage.navigation;
const getSuggestionContentType = state => state.searchPage.contentType;
const getNumberOfItemsPerColumn = state => state.searchPage.itemsPerColumn;

export const suggestionGroupsSelector = createSelector(
  getSuggestionGroups,
  (suggestionGroups) => (
    pick(omitBy(suggestionGroups, isEmpty), SEARCH_CATEGORIES)
  )
);

/*
  [
    {
      header: 'OFFICER',
      items: [<officer1>, <officer2>]
    },
    {
      header: 'CO-ACCUSED',
      items: [<ca1>, <ca2>]
    }
  ]
*/
export const orderedSuggestionGroupsSelector = createSelector(
  suggestionGroupsSelector,
  unorderedSuggestionGroups => {
    const orderedKeys = keys(unorderedSuggestionGroups);
    return orderedKeys.map(key => ({ header: key, items: unorderedSuggestionGroups[key] }));
  }
);

export const isShowingSingleContentTypeSelector = createSelector(
  getSuggestionContentType,
  contentType => !!contentType
);

/*
[
  {
    header: 'OFFICER',
    columns: [
      [1, 2],
      [3, 4]
    ],
    canLoadMore: <boolean>
  },
  {
    header: 'CO-ACCUSED',
    columns: [
      [1, 2],
      [3, 4]
    ],
    canLoadMore: <boolean>
  }
]
*/
export const chunkedSuggestionGroupsSelector = createSelector(
  orderedSuggestionGroupsSelector,
  getNumberOfItemsPerColumn,
  isShowingSingleContentTypeSelector,
  (orderedGroups, itemsPerColumn, isSingle) => {
    if (!orderedGroups || orderedGroups.length === 0) {
      return [];
    }

    if (isSingle) {
      const group = orderedGroups[0];
      return [{
        header: group.header,
        columns: chunk(group.items, itemsPerColumn),
        canLoadMore: false
      }];

    } else {
      return orderedGroups.map((group, index) => {
        const slicedGroup = group.items.slice(0, itemsPerColumn);
        return {
          header: group.header,
          columns: [slicedGroup],
          canLoadMore: slicedGroup.length >= itemsPerColumn
        };
      });
    }
  }
);

export const coordinatesMapSelector = createSelector(
  chunkedSuggestionGroupsSelector,
  chunkedGroups => {
    const columns = flatten(chunkedGroups.map(group => group.columns));
    return columns;
  }
);

export const focusedSuggestionSelector = createSelector(
  coordinatesMapSelector,
  getSuggestionNavigation,
  (coordinatesMap, { columnIndex, itemIndex }) => {
    const column = coordinatesMap[columnIndex];
    if (column) {
      return column[itemIndex];
    }
    return {};
  }
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
  coordinatesMapSelector,
  (coordinatesMap) => coordinatesMap.map(column => column.length)
);
