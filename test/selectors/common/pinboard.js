import { createWithIsPinnedSelector } from 'selectors/common/pinboard';
import { ACTIVITY_GRID_CARD_TYPES, PINNED_ITEM_TYPES } from 'utils/constants';


describe('pinboard common selectors', function () {
  describe('createWithIsPinnedSelector', function () {
    it('should return a selector which adds isPinned attr to officer cards', function () {
      const storeState = {
        pinboardPage: {
          pinboard: {
            'officer_ids': ['1', '2', '3'],
          },
        },
        officerCards: [
          { id: 1, allegationCount: 3 }, { id: 2, allegationCount: 2 }, { id: 99, allegationCount: 1 },
        ],
      };
      const cardTransform = card => ({ ...card, officerId: card.id });
      const officerCardsSelector = state => state.officerCards;
      const withIsPinnedOfficerCardsSelector = createWithIsPinnedSelector(
        officerCardsSelector, PINNED_ITEM_TYPES.OFFICER, cardTransform,
      );

      withIsPinnedOfficerCardsSelector(storeState).should.eql([
        { id: 1, officerId: 1, isPinned: true, allegationCount: 3 },
        { id: 2, officerId: 2, isPinned: true, allegationCount: 2 },
        { id: 99, officerId: 99, isPinned: false, allegationCount: 1 },
      ]);
    });

    it('should return a selector which adds isPinned attr to trr cards', function () {
      const storeState = {
        pinboardPage: {
          pinboard: {
            'trr_ids': ['1', '2', '3'],
          },
        },
        trrCards: [
          { id: 1, officerId: 12 }, { id: 2, officerId: 34 }, { id: 99, officerId: 56 },
        ],
      };
      const cardTransform = card => ({ ...card, trrId: card.id });
      const trrCardsSelector = state => state.trrCards;
      const withIsPinnedTRRCardsSelector = createWithIsPinnedSelector(
        trrCardsSelector, PINNED_ITEM_TYPES.TRR, cardTransform,
      );

      withIsPinnedTRRCardsSelector(storeState).should.eql([
        { id: 1, trrId: 1, isPinned: true, officerId: 12 },
        { id: 2, trrId: 2, isPinned: true, officerId: 34 },
        { id: 99, trrId: 99, isPinned: false, officerId: 56 },
      ]);
    });

    it('should return a selector which adds isPinned attr to cr cards', function () {
      const storeState = {
        pinboardPage: {
          pinboard: {
            'crids': ['1', '2', '3'],
          },
        },
        crCards: [
          { crid: '1', finding: 'Not Sustained' },
          { crid: '2', finding: 'Sustained' },
          { crid: '99', finding: 'Not Sustained' },
        ],
      };
      const cardTransform = card => ({ ...card, id: card.crid });
      const crCardsSelector = state => state.crCards;
      const withIsPinnedCRCardsSelector = createWithIsPinnedSelector(
        crCardsSelector, PINNED_ITEM_TYPES.CR, cardTransform,
      );

      withIsPinnedCRCardsSelector(storeState).should.eql([
        { id: '1', crid: '1', isPinned: true, finding: 'Not Sustained' },
        { id: '2', crid: '2', isPinned: true, finding: 'Sustained' },
        { id: '99', crid: '99', isPinned: false, finding: 'Not Sustained' },
      ]);
    });

    it('should return a selector which handle paring cards differently', function () {
      const storeState = {
        pinboardPage: {
          pinboard: {
            'officer_ids': ['1', '2', '3'],
          },
        },
        officerPairingCards: [
          { kind: ACTIVITY_GRID_CARD_TYPES.PAIR, officer1: { id: 1 }, officer2: { id: 2 }, coaccusalCount: 2 },
          { kind: ACTIVITY_GRID_CARD_TYPES.PAIR, officer1: { id: 3 }, officer2: { id: 4 }, coaccusalCount: 22 },
          { kind: ACTIVITY_GRID_CARD_TYPES.PAIR, officer1: { id: 5 }, officer2: { id: 99 }, coaccusalCount: 222 },
        ],
      };
      const cardTransform = card => ({ ...card, type: 'PairingCard' });
      const officerPairingCardsSelector = state => state.officerPairingCards;
      const withIsPinnedPairingCardsSelector = createWithIsPinnedSelector(
        officerPairingCardsSelector, PINNED_ITEM_TYPES.OFFICER, cardTransform,
      );

      withIsPinnedPairingCardsSelector(storeState).should.eql([
        {
          kind: ACTIVITY_GRID_CARD_TYPES.PAIR,
          type: 'PairingCard',
          officer1: { id: 1, isPinned: true },
          officer2: { id: 2, isPinned: true },
          coaccusalCount: 2,
        },
        {
          kind: ACTIVITY_GRID_CARD_TYPES.PAIR,
          type: 'PairingCard',
          officer1: { id: 3, isPinned: true },
          officer2: { id: 4, isPinned: false },
          coaccusalCount: 22,
        },
        {
          kind: ACTIVITY_GRID_CARD_TYPES.PAIR,
          type: 'PairingCard',
          officer1: { id: 5, isPinned: false },
          officer2: { id: 99, isPinned: false },
          coaccusalCount: 222,
        },
      ]);
    });
  });
});
