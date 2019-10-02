import { createSelector } from 'reselect';

import { cardTransform, createWithIsPinnedSelector, shuffled } from './common';
import { PINNED_ITEM_TYPES } from 'utils/constants';


const getCards = state => state.landingPage.activityGrid.cards;
export const getCarouselActivityHeaderEditModeOn = state => state.landingPage.activityGrid.headerEditModeOn;

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

export const cardsSelector = createWithIsPinnedSelector(
  shuffled(getCards),
  PINNED_ITEM_TYPES.OFFICER,
  cardTransform,
);
