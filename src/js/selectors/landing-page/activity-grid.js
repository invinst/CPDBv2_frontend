import { createSelector } from 'reselect';
import { shuffle } from 'lodash';


const getCards = state => state.landingPage.activityGrid.cards;

const cardTransform = card => ({
  id: card['id'],
  fullName: card['full_name'],
  visualTokenBackgroundColor: card['visual_token_background_color']
});

export const cardsSelector = createSelector(
  [getCards],
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf).map(cardTransform);
  }
);
