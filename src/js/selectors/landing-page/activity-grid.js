import { createSelector } from 'reselect';
import { shuffle } from 'lodash';

import { cardTransform } from './common';


export const getCarouselActivityHeaderEditModeOn = state => state.landingPage.activityGrid.headerEditModeOn;
const getCards = state => state.landingPage.activityGrid.cards;

export const cardsSelector = createSelector(
  [getCards],
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf).map(cardTransform);
  }
);

