import { createSelector } from 'reselect';
import { filter } from 'lodash';
import { createWithIsPinnedSelector, shuffled } from 'selectors/landing-page/common';
import { PINNED_ITEM_TYPES } from 'utils/constants';


export const getCarouselComplaintHeaderEditModeOn = state => state.landingPage.complaintSummaries.headerEditModeOn;
const getCards = state => state.landingPage.complaintSummaries.cards;

const cardTransform = (card) => ({
  crid: card['crid'],
  incidentDate: card['incident_date'],
  categoryNames: filter(card['category_names'], cat => cat !== 'Unknown'),
  summary: card['summary'],
});

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

export const cardsSelector = createWithIsPinnedSelector(
  shuffled(getCards),
  PINNED_ITEM_TYPES.CR,
  cardTransform,
);
