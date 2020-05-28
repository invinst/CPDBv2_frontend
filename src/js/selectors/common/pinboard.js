import { createSelector } from 'reselect';
import { identity } from 'lodash';

import { ACTIVITY_GRID_CARD_TYPES, PINNED_ITEM_TYPES } from 'utils/constants';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


export const createWithIsPinnedSelector = (cardsSelector, pinnedType, cardTransform=identity) => createSelector(
  cardsSelector,
  pinboardItemsSelector,
  (cards, pinboardItems) => {
    const idField = pinnedType === PINNED_ITEM_TYPES.CR ? 'crid' : 'id';
    return cards.map(cardTransform).map(item => {
      if (item.kind === ACTIVITY_GRID_CARD_TYPES.PAIR) {
        const { officer1, officer2 } = item;
        return {
          ...item,
          officer1: {
            ...officer1,
            isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, officer1.id, pinboardItems),
          },
          officer2: {
            ...officer2,
            isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, officer2.id, pinboardItems),
          },
        };
      } else {
        return {
          ...item,
          isPinned: isItemPinned(pinnedType, item[idField], pinboardItems),
        };
      }
    });
  },
);
