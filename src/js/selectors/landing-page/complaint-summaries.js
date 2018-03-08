import { createSelector } from 'reselect';
import { shuffle } from 'lodash';


export const getCarouselComplaintHeaderEditModeOn = state => state.landingPage.complaintSummaries.headerEditModeOn;
const getCards = state => state.landingPage.complaintSummaries.cards;

const cardTransform = (card) => ({
  crid: card['crid'],
  incidentDate: card['incident_date'],
  categoryNames: card['category_names'],
  summary: card['summary']
});

export const cardsSelector = createSelector(
  [getCards],
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf).map(cardTransform);
  }
);
