import { createSelector } from 'reselect';
import { shuffle, toLower } from 'lodash';


const getCards = state => state.landingPage.activityGrid.cards;
const cardTransform = card => ({
  id: card['id'],
  fullName: card['full_name'],
  visualTokenBackgroundColor: card['visual_token_background_color'],
  complaintCount: card['complaint_count'],
  sustainedCount: card['sustained_count'],
  complaintRate: 50,  // TODO: use actual percentile number when that's available
  birthYear: card['birth_year'],
  race: toLower(card['race']),
  gender: toLower(card['gender']),
});

export const cardsSelector = createSelector(
  [getCards],
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf).map(cardTransform);
  }
);
