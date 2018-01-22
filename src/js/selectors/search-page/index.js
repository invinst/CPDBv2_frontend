import { createSelector } from 'reselect';
import { omitBy, isEmpty, keys, pick, indexOf, sortBy, get, flatten, map } from 'lodash';

import * as constants from 'utils/constants';
import { getThisYear } from 'utils/date';
import { searchResultItemTransform } from './search-result';
import { getSvgUrl } from 'utils/visual-token';
import extractQuery from 'utils/extract-query';

const SEARCH_CATEGORIES = ['OFFICER', 'CO-ACCUSED', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT', 'UNIT > OFFICERS', 'CR'];

const getSuggestionGroups = state => state.searchPage.suggestionGroups;
const getSuggestionTags = state => state.searchPage.tags;
const getSuggestionNavigation = state => state.searchPage.navigation;
const getSuggestionContentType = state => state.searchPage.contentType;
const getQuery = state => state.searchPage.query;
const getPagination = state => state.searchPage.pagination;

const currentYear = getThisYear();


export const isShowingSingleContentTypeSelector = createSelector(
  getSuggestionContentType,
  getSuggestionTags,
  (contentType, tags) => !!contentType || tags.length === 1
);

const itemsPerCategory = 5;

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
const slicedSuggestionGroupsSelector = createSelector(
  getSuggestionGroups,
  isShowingSingleContentTypeSelector,
  (suggestionGroups, isSingle) => {
    let groups = pick(omitBy(suggestionGroups, isEmpty), SEARCH_CATEGORIES);

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

const itemsListSelector = createSelector(
  slicedSuggestionGroupsSelector,
  groups => {
    return flatten(groups.map(group => {
      if (group.canLoadMore) {
        const more = {
          id: group.header,
          type: 'more'
        };
        group.items.push(more);
      }
      return group.items;
    }));
  }
);

const focusedSuggestionSelector = createSelector(
  itemsListSelector,
  getSuggestionNavigation,
  (itemsList, { itemIndex }) => {
    if (itemIndex < 0) {
      return {};
    }
    if (itemsList.length) {
      return itemsList[itemIndex];
    }
    return {};
  }
);

export const focusedItemSelector = createSelector(
  focusedSuggestionSelector,
  searchResultItemTransform
);

export const suggestionTagsSelector = createSelector(
  getSuggestionTags,
  getQuery,
  (suggestionTags, query) => {
    if (!query) {
      return [constants.RECENT_CONTENT_TYPE];
    }
    return sortBy(suggestionTags, tag => indexOf(SEARCH_CATEGORIES, tag));
  }
);

export const isEmptySelector = createSelector(
  slicedSuggestionGroupsSelector,
  suggestionGroups => !suggestionGroups.length
);

export const totalItemCountSelector = createSelector(
  itemsListSelector,
  (itemsList) => itemsList.length
);

const previewPaneTypeMap = {
  'OFFICER': (suggestion) => {
    const { payload, id, text } = suggestion;
    const visualTokenImg = getSvgUrl(id);
    const data = [
      ['unit', payload.unit],
      ['rank', payload.rank],
      [`${currentYear} salary`, payload.salary],
      ['race', payload.race],
      ['sex', payload.sex]
    ];
    const visualTokenBackgroundColor = payload['visual_token_background_color'];
    return { data, visualTokenBackgroundColor, visualTokenImg, text };
  }
};

export const previewPaneInfoSelector = createSelector(
  focusedSuggestionSelector,
  suggestion => {
    return get(previewPaneTypeMap, suggestion.type, () => ({}))(suggestion);
  }
);

export const searchResultGroupsSelector = createSelector(
  slicedSuggestionGroupsSelector,
  groups => map(groups, ({ header, items, canLoadMore }) => ({
    header,
    canLoadMore,
    items: map(items, item => searchResultItemTransform(item))
  }))
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
