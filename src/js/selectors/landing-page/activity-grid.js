import { createSelector } from 'reselect';
import { shuffle, filter } from 'lodash';

import { cardTransform } from './common';
import { ACTIVITY_GRID_CARD_TYPES } from 'utils/constants';


const getCards = state => state.landingPage.activityGrid.cards;
export const getCarouselActivityHeaderEditModeOn = state => state.landingPage.activityGrid.headerEditModeOn;

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

const processCard = (cards, cardType) => {
  const filteredCards = cardType ? filter(cards, ['type', cardType]) : cards;
  const upperHalf = shuffle(filteredCards.slice(0, 12));
  const lowerHalf = shuffle(filteredCards.slice(12));
  return upperHalf.concat(lowerHalf).map(cardTransform);
};

export const cardsSelector = createSelector(
  getCards,
  cards => processCard(cards)
);

export const singleCardsSelector = createSelector(
  getCards,
  cards => processCard(cards, ACTIVITY_GRID_CARD_TYPES.OFFICER)
);
