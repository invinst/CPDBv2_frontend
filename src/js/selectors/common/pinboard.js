import { createSelector } from 'reselect';
import { identity, get } from 'lodash';
import moment from 'moment';

import { ACTIVITY_GRID_CARD_TYPES, PINNED_ITEM_TYPES, DATE_FORMAT } from 'utils/constants';
import {
  isItemPinned,
  pinboardPinnedItemsTransform,
  pinboardPinnedItemsMapping,
  pinboardItemsSelector,
} from 'selectors/pinboard-page/pinboard';


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

export const pinboardsMenuSelector = (idSelector, itemType) => createSelector(
  state => state.pinboardPage.pinboardsMenu,
  state => state.pinboardPage.pinboard,
  idSelector,
  (pinboards, currentPinboard, id) => pinboards.map(pinboard => {
    const isCurrent = pinboard.id === currentPinboard.id;

    const pinboardData = pinboardPinnedItemsTransform(isCurrent ? currentPinboard : pinboard);
    const isPinned = isItemPinned(itemType, id, pinboardPinnedItemsMapping(pinboardData));
    return {
      id: pinboard['id'].toString(),
      title: get(pinboard, 'title', ''),
      createdAt: moment(pinboard['created_at']).format(DATE_FORMAT),
      isPinned,
      isCurrent,
    };
  }),
);
