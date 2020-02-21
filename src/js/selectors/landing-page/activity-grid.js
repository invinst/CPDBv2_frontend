import { createSelector } from 'reselect';
import { filter, range, sample, isUndefined } from 'lodash';

import { cardTransform, shuffled } from './common';
import { PINNED_ITEM_TYPES, ACTIVITY_GRID_CARD_TYPES } from 'utils/constants';
import { createWithIsPinnedSelector } from 'selectors/common/pinboard';


const getCards = state => state.landingPage.activityGrid.cards;

const selectRandomPairingCard = (cards) => {
  const paringCardIndices = filter(range(cards.length), (index) => cards[index].kind === ACTIVITY_GRID_CARD_TYPES.PAIR);
  return sample(paringCardIndices);
};

const moveParingCardToBeginning = (selector) => createSelector(
  selector,
  cards => {
    const pairingCardIndex = selectRandomPairingCard(cards);
    if (isUndefined(pairingCardIndex) || pairingCardIndex === 0) {
      return cards;
    }
    return [cards[pairingCardIndex], ...filter(cards, (_, index) => index !== pairingCardIndex )];
  }
);

export const getCarouselActivityHeaderEditModeOn = state => state.landingPage.activityGrid.headerEditModeOn;

export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

export const cardsSelector = createWithIsPinnedSelector(
  moveParingCardToBeginning(shuffled(getCards)),
  PINNED_ITEM_TYPES.OFFICER,
  cardTransform,
);
