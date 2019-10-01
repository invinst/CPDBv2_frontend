import { createSelector } from 'reselect';
import { shuffle, filter } from 'lodash';

import { cardTransform } from './common';
import { ACTIVITY_GRID_CARD_TYPES, PINNED_ITEM_TYPES } from 'utils/constants';
import { pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { isItemPinned } from 'selectors/pinboard-page/pinboard';


const getCards = state => state.landingPage.activityGrid.cards;
export const getCarouselActivityHeaderEditModeOn = state => state.landingPage.activityGrid.headerEditModeOn;

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

const processCard = (cards, cardType, pinboardItems) => {
  const filteredCards = cardType ? filter(cards, ['kind', cardType]) : cards;
  const upperHalf = shuffle(filteredCards.slice(0, 12));
  const lowerHalf = shuffle(filteredCards.slice(12));
  return upperHalf.concat(lowerHalf).map(cardTransform).map(item => ({
    ...item,
    isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, item.id, pinboardItems),
  }));
};

export const cardsSelector = createSelector(
  getCards,
  pinboardItemsSelector,
  (cards, pinboardItems) => processCard(cards, undefined, pinboardItems)
);

export const singleCardsSelector = createSelector(
  getCards,
  pinboardItemsSelector,
  (cards, pinboardItems) => processCard(cards, ACTIVITY_GRID_CARD_TYPES.OFFICER, pinboardItems),
);
