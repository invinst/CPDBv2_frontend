import { createSelector } from 'reselect';
import { shuffle } from 'lodash';

import { cardTransform } from './common';


const getCards = state => state.landingPage.activityGrid.cards;
export const getCarouselActivityHeaderEditModeOn = state => state.landingPage.activityGrid.headerEditModeOn;

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

export const cardsSelector = createSelector(
  [getCards],
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf).map(cardTransform);
  }
);

