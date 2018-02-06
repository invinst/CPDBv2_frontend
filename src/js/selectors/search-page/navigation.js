import { createSelector } from 'reselect';
import { flatten, concat } from 'lodash';

import * as constants from 'utils/constants';
import { navigationItemTransform, previewPaneTransform } from './transforms';
import { slicedSuggestionGroupsSelector } from './base';
import { focusedSearchTermItemSelector } from './search-terms';
import { hiddenSelector } from 'selectors/search-page/search-terms';


const getSuggestionNavigation = state => state.searchPage.navigation;

const navigationItemListSelector = createSelector(
  slicedSuggestionGroupsSelector,
  groups => concat(
    [{ uniqueKey: constants.SEARCH_BOX }],
    flatten(groups.map(group => [
      ...group.items,
      ...(
        group.canLoadMore ?
        [{
          id: group.header,
          type: constants.MORE_BUTTON
        }] :
        []
      )
    ]))
  )
);

const rawFocusedItemSelector = createSelector(
  navigationItemListSelector,
  getSuggestionNavigation,
  (itemsList, { itemIndex }) => {
    if (itemsList[itemIndex] !== undefined) {
      return itemsList[itemIndex];
    }
    return itemsList[0];
  }
);

export const focusedResultItemSelector = createSelector(
  rawFocusedItemSelector,
  navigationItemTransform
);

export const getfocusedItem = (state) => {
  return hiddenSelector(state) ? focusedResultItemSelector(state) : focusedSearchTermItemSelector(state);
};

export const previewPaneInfoSelector = createSelector(
  rawFocusedItemSelector,
  previewPaneTransform
);

export const totalItemCountSelector = createSelector(
  navigationItemListSelector,
  (itemsList) => itemsList.length
);
