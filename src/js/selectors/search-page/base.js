import { createSelector } from 'reselect';
import { omitBy, isEmpty, keys, pick, map } from 'lodash';

import * as constants from 'utils/constants';

const getSuggestionGroups = state => state.searchPage.suggestionGroups;
const getSuggestionContentType = state => state.searchPage.contentType;
const getSuggestionTags = state => state.searchPage.tags;

const itemsPerCategory = 5;

export const isShowingSingleContentTypeSelector = createSelector(
  getSuggestionContentType,
  getSuggestionTags,
  (contentType, tags) => !!contentType || tags.length === 1
);

/*
[
  {
    header: 'OFFICER',
    items: [
      1, 2, 3, 4, 5
    ],
    canLoadMore: <boolean>
  },
  {
    header: 'CO-ACCUSED',
    items: [
      1, 2, 3, 4
    ],
    canLoadMore: <boolean>
  }
]
*/
export const slicedSuggestionGroupsSelector = createSelector(
  getSuggestionGroups,
  isShowingSingleContentTypeSelector,
  (suggestionGroups, isSingle) => {
    let groups = pick(omitBy(suggestionGroups, isEmpty), constants.SEARCH_CATEGORIES);

    return keys(groups).map(key => {
      let items = isSingle ? groups[key] : groups[key].slice(0, itemsPerCategory);
      items = map(items, item => ({ ...item, type: key }));
      return {
        header: key,
        items,
        canLoadMore: !isSingle && items.length >= itemsPerCategory
      };
    });
  }
);
