import { createSelector } from 'reselect';
import { shuffle } from 'lodash';
import { cardTransform } from './common';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import { PINNED_ITEM_TYPES } from 'utils/constants';


export const getCarouselAllegationHeaderEditModeOn = state => state.landingPage.officersByAllegation.headerEditModeOn;
const getCards = state => state.landingPage.officersByAllegation.cards;
export const hasCards = createSelector(
  getCards,
  cards => cards.length > 0
);

export const shuffled = (selector) => createSelector(
  selector,
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf);
  }
);

export const cardsSelector = createSelector(
  shuffled(getCards),
  pinboardItemsSelector,
  (shuffledCards, pinboardItems) => shuffledCards.map(cardTransform).map(item => ({
    ...item,
    isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, item.id, pinboardItems),
  }))
);
