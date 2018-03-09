import { createSelector } from 'reselect';
import { shuffle } from 'lodash';
import { cardTransform } from './common';


export const getCarouselAllegationHeaderEditModeOn = state => state.landingPage.officersByAllegation.headerEditModeOn;
const getCards = state => state.landingPage.officersByAllegation.cards;

export const cardsSelector = createSelector(
  [getCards],
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf).map(cardTransform);
  }
);
