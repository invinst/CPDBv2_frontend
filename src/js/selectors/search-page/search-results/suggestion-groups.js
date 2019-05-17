import { createSelector } from 'reselect';
import { indexOf, isEmpty, head, keys, map, omitBy, pick, sortBy } from 'lodash';

import * as constants from 'utils/constants';
import { searchResultItemTransform } from './transforms';
import extractQuery from 'utils/extract-query';
import { dataToolSearchUrl } from 'utils/v1-url';
import { pinboardItemsSelector } from 'selectors/pinboard';


const itemsPerCategory = 5;

const getSuggestionGroups = state => state.searchPage.suggestionGroups;
const getSuggestionTags = state => state.searchPage.tags;
const getSuggestionContentType = state => state.searchPage.contentType;
export const getQuery = state => state.searchPage.query;
const getPagination = state => state.searchPage.pagination;

export const suggestionTagsSelector = createSelector(
  getSuggestionTags,
  getQuery,
  (suggestionTags, query) => {
    if (!query) {
      return [constants.RECENT_CONTENT_TYPE];
    }
    return sortBy(suggestionTags, tag => indexOf(constants.SEARCH_CATEGORIES, tag));
  }
);

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
  getSuggestionContentType,
  (suggestionGroups, isSingle, contentType) => {
    let groups = pick(omitBy(suggestionGroups, isEmpty), contentType || constants.SEARCH_CATEGORIES);

    let lastIndex = 1;
    return keys(groups).map((key) => {
      let items = isSingle ? groups[key] : groups[key].slice(0, itemsPerCategory);
      items = map(items, item => ({
        ...item,
        type: key,
        itemIndex: lastIndex++
      }));

      const canLoadMore = !isSingle && items.length >= itemsPerCategory;
      canLoadMore && lastIndex++;
      return {
        header: key,
        items,
        canLoadMore: canLoadMore,
      };
    });
  }
);

const pinnedItemTypeMap = {
  'CR': 'CR',
  'DATE > CR': 'CR',
  'INVESTIGATOR > CR': 'CR',
  'OFFICER': 'OFFICER',
  'UNIT > OFFICERS': 'OFFICER',
  'DATE > OFFICERS': 'OFFICER',
  'TRR': 'TRR',
  'DATE > TRR': 'TRR',
};

const pinItem = (item, pinboardItems) => {
  const pinnedItemType = pinnedItemTypeMap[item.type];
  item.isPinned =
    (pinboardItems.hasOwnProperty(pinnedItemType)) &&
    (pinboardItems[pinnedItemType].indexOf(item.id) !== -1);
  return item;
};

export const isEmptySelector = createSelector(
  slicedSuggestionGroupsSelector,
  suggestionGroups => !suggestionGroups.length
);

export const searchResultGroupsSelector = createSelector(
  slicedSuggestionGroupsSelector,
  pinboardItemsSelector,
  (groups, pinboardItems) => map(groups, ({ header, items, canLoadMore }) => ({
    header,
    canLoadMore,
    items: map(items, item => searchResultItemTransform(pinItem(item, pinboardItems)))
  }))
);

export const firstItemSelector = createSelector(
  searchResultGroupsSelector,
  getQuery,
  (suggestionGroups, query) => {
    if (suggestionGroups.length === 0) {
      return {
        url: dataToolSearchUrl(query),
        isDataToolSearchUrl: true,
      };
    } else {
      const firstGroup = head(suggestionGroups);
      const firstRecord = head(firstGroup.items);

      return {
        to: firstRecord.to,
        url: firstRecord.url,
        recentText: firstRecord.recentText,
        type: firstGroup.header
      };
    }
  }
);

export const hasMoreSelector = createSelector(
  isShowingSingleContentTypeSelector,
  getPagination,
  (singleContent, { next }) => (singleContent && !!next)
);

export const nextParamsSelector = createSelector(
  getPagination,
  ({ next }) => (extractQuery(next))
);
