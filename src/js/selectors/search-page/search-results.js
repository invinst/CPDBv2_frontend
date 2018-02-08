import { createSelector } from 'reselect';
import { indexOf, sortBy, map } from 'lodash';

import * as constants from 'utils/constants';
import { searchResultItemTransform } from './transforms';
import extractQuery from 'utils/extract-query';
import { slicedSuggestionGroupsSelector, isShowingSingleContentTypeSelector } from './base';


const getSuggestionTags = state => state.searchPage.tags;
const getQuery = state => state.searchPage.query;
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

export const isEmptySelector = createSelector(
  slicedSuggestionGroupsSelector,
  suggestionGroups => !suggestionGroups.length
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
