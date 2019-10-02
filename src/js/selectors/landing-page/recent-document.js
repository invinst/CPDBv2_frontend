import { get } from 'lodash';

import { createSelector } from 'reselect';
import { formatDate } from 'utils/date';
import { createWithIsPinnedSelector } from 'selectors/landing-page/common';
import { PINNED_ITEM_TYPES } from 'utils/constants';


export const getCarouselDocumentHeaderEditModeOn = state => state.landingPage.recentDocument.headerEditModeOn;
const getCards = state => state.landingPage.recentDocument.cards;

const cardTransform = (card) => ({
  crid: card['crid'],
  title: card['latest_document'] ? card['latest_document']['title'] : '',
  url: card['latest_document'] ? card['latest_document']['url'] : '',
  id: card['latest_document'] ? card['latest_document']['id'] : '',
  previewImageUrl: card['latest_document'] ? card['latest_document']['preview_image_url'] : '',
  incidentDate: formatDate(card['incident_date'], false) || '',
  category: get(card, 'category', 'Unknown'),
});

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

export const cardsSelector = createWithIsPinnedSelector(
  getCards,
  PINNED_ITEM_TYPES.CR,
  cardTransform,
);
