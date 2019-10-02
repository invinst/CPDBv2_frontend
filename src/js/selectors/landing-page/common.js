import { shuffle, toLower } from 'lodash';

import { ACTIVITY_GRID_CARD_TYPES, PINNED_ITEM_TYPES } from 'utils/constants';
import { getVisualTokenOIGBackground } from 'utils/visual-token';
import { getCurrentAge } from 'utils/date';
import { officerCardTransform } from 'selectors/common/officer-card';
import { createSelector } from 'reselect';
import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';


export const singleCardTransform = card => ({
  ...officerCardTransform(card),
  kind: card['kind'],
});

export const cardTransform = card => {
  if (!card['kind']) {
    return singleCardTransform(card);
  } else if (card['kind'] === ACTIVITY_GRID_CARD_TYPES.OFFICER) {
    return singleCardTransform(card);
  } else if (card['kind'] === ACTIVITY_GRID_CARD_TYPES.PAIR) {
    return pairingCardTransform(card);
  }
};

export const simpleOfficerTransform = officer => {
  const percentile = officer.percentile;

  const background = getVisualTokenOIGBackground(
    parseFloat(percentile['percentile_allegation_civilian']),
    parseFloat(percentile['percentile_allegation_internal']),
    parseFloat(percentile['percentile_trr'])
  );

  return {
    id: officer['id'],
    fullName: officer['full_name'],
    age: officer['birth_year'] ? getCurrentAge(officer['birth_year']) : 'N/A',
    race: officer['race'] ? toLower(officer['race']) : 'N/A',
    gender: officer['gender'] ? toLower(officer['gender']) : 'N/A',
    rank: officer['rank'],
    percentile: {
      percentileAllegation: percentile['percentile_allegation'],
      percentileAllegationCivilian: percentile['percentile_allegation_civilian'],
      percentileAllegationInternal: percentile['percentile_allegation_internal'],
      percentileTrr: percentile['percentile_trr'],
    },
    backgroundColor: background.backgroundColor,
  };
};

export const pairingCardTransform = card => ({
  kind: card['kind'],
  coaccusalCount: card['coaccusal_count'],
  officer1: simpleOfficerTransform(card['officer1']),
  officer2: simpleOfficerTransform(card['officer2']),
});

export const shuffled = (selector) => createSelector(
  selector,
  cards => {
    const upperHalf = shuffle(cards.slice(0, 12));
    const lowerHalf = shuffle(cards.slice(12));
    return upperHalf.concat(lowerHalf);
  }
);

export const createWithIsPinnedSelector = (cardsSelector, pinnedType, cardTransform) => createSelector(
  cardsSelector,
  pinboardItemsSelector,
  (shuffledCards, pinboardItems) => {
    const idField = pinnedType === PINNED_ITEM_TYPES.CR ? 'crid' : 'id';
    return shuffledCards.map(cardTransform).map(item => {
      if (item.kind === ACTIVITY_GRID_CARD_TYPES.PAIR) {
        const { officer1, officer2 } = item;
        return {
          ...item,
          officer1: {
            ...officer1,
            isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, officer1.id, pinboardItems),
          },
          officer2: {
            ...officer2,
            isPinned: isItemPinned(PINNED_ITEM_TYPES.OFFICER, officer2.id, pinboardItems),
          },
        };
      } else {
        return {
          ...item,
          isPinned: isItemPinned(pinnedType, item[idField], pinboardItems),
        };
      }
    });
  }
);
