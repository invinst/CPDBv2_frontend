import { createSelector } from 'reselect';
import { get } from 'lodash';
import { formatDate } from 'utils/date';

export const getCarouselLawsuitHeaderEditModeOn = state => state.landingPage.topLawsuits.headerEditModeOn;
const getCards = state => state.landingPage.topLawsuits.cards;

const cardTransform = (lawsuit) => ({
  caseNo: lawsuit.case_no,
  summary: lawsuit.summary,
  primaryCause: lawsuit.primary_cause,
  incidentDate: formatDate(get(lawsuit, 'incident_date'), false),
});

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

export const cardsSelector = createSelector(
  getCards,
  cards => cards.map(cardTransform)
);
