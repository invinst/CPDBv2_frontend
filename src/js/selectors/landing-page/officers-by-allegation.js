import { createSelector } from 'reselect';
import { cardTransform, shuffled } from './common';
import { PINNED_ITEM_TYPES } from 'utils/constants';
import { createWithIsPinnedSelector } from 'selectors/common/pinboard';


export const getCarouselAllegationHeaderEditModeOn = state => state.landingPage.officersByAllegation.headerEditModeOn;
const getCards = state => state.landingPage.officersByAllegation.cards;
export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);


export const cardsSelector = createWithIsPinnedSelector(
  shuffled(getCards),
  PINNED_ITEM_TYPES.OFFICER,
  cardTransform,
);
