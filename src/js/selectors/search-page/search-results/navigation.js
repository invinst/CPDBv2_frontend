import { createSelector } from 'reselect';
import { flatten, concat } from 'lodash';

import * as constants from 'utils/constants';
import { navigationItemTransform, previewPaneTransform } from 'selectors/common/preview-pane-transforms';
import { slicedSuggestionGroupsSelector, getPinnedItem } from './suggestion-groups';
import { pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


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
  pinboardItemsSelector,
  (itemsList, { itemIndex }, pinboardItems) => {
    if (itemsList[itemIndex] !== undefined) {
      return getPinnedItem(itemsList[itemIndex], pinboardItems);
    }
    const item = getPinnedItem(itemsList[0], pinboardItems);
    return item;
  }
);

export const focusedResultItemSelector = createSelector(
  rawFocusedItemSelector,
  navigationItemTransform
);

export const previewPaneInfoSelector = createSelector(
  rawFocusedItemSelector,
  previewPaneTransform
);

export const totalItemCountSelector = createSelector(
  navigationItemListSelector,
  (itemsList) => itemsList.length
);
