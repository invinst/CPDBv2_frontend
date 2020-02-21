import lodash from 'lodash';
import { spy } from 'sinon';

import { pairingCardTransform } from 'selectors/landing-page/common';
import { cardsSelector, hasCards } from 'selectors/landing-page/activity-grid';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid.js';


const pinnedPairingCardTransform = (pairingCard) => {
  const transformedCard = pairingCardTransform(pairingCard);
  transformedCard.officer1['isPinned'] = false;
  transformedCard.officer2['isPinned'] = false;
  return transformedCard;
};

describe('activity-grid selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        activityGrid: {},
      },
      pinboardPage: { pinboard: { 'officer_ids': ['1', '2', '3'] } },
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.activityGrid.cards = RawOfficerCardFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should transform correctly', function () {
      state.landingPage.activityGrid.cards = [{
        id: 1,
        'full_name': 'someone',
        'visual_token_background_color': 'red',
        'complaint_count': 10,
        'sustained_count': 5,
        'complaint_percentile': 80,
        'birth_year': 1970,
        race: 'Black',
        rank: 'Police Officer',
        gender: 'Female',
        kind: 'single_officer',
      }, {
        id: 9,
        'full_name': 'someone',
        'visual_token_background_color': 'red',
        'complaint_count': 10,
        'sustained_count': 5,
        'complaint_percentile': 80,
        'birth_year': 1970,
        race: 'Black',
        rank: 'Police Officer',
        gender: 'Female',
        kind: 'single_officer',
      }];
      const expectation = {
        1: {
          id: 1,
          officerId: 1,
          fullName: 'someone',
          complaintCount: 10,
          sustainedCount: 5,
          complaintPercentile: 80,
          age: '47-year-old',
          race: 'black',
          rank: 'Police Officer',
          gender: 'female',
          percentile: null,
          kind: 'single_officer',
          isPinned: true,
        },
        9: {
          id: 9,
          officerId: 9,
          fullName: 'someone',
          complaintCount: 10,
          sustainedCount: 5,
          complaintPercentile: 80,
          age: '47-year-old',
          race: 'black',
          rank: 'Police Officer',
          gender: 'female',
          percentile: null,
          kind: 'single_officer',
          isPinned: false,
        },
      };

      const cards = cardsSelector(state);
      cards.should.have.length(2);
      cards.forEach(card => card.should.eql(expectation[card.id]));
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
      state.landingPage.activityGrid.cards = lodash.range(40);

      cardsSelector(state);

      stubShuffle.calledWith(lodash.range(0, 12)).should.be.true();
      stubShuffle.calledWith(lodash.range(12, 40)).should.be.true();
    });

    it('should return pairing card in the 1st position', function () {
      state.landingPage.activityGrid.cards = [{
        id: 16473,
        'full_name': 'Robert Longfellow',
        'complaint_count': 0,
        'sustained_count': 0,
        'birth_year': 1924,
        'complaint_percentile': null,
        race: 'White',
        gender: 'Male',
        rank: 'Police Officer / Mounted Patrol Officer',
        percentile: {
          year: 1984,
        },
        kind: 'single_officer',
      }, {
        id: 13788,
        'full_name': 'Broderick Jones',
        'complaint_count': 107,
        'sustained_count': 11,
        'birth_year': 1971,
        'complaint_percentile': 99.9911,
        race: 'Black',
        gender: 'Male',
        rank: 'Police Officer',
        percentile: {
          year: 1999,
        },
        kind: 'single_officer',
      }, {
        officer1: {
          id: 13937,
          'full_name': 'Jaeho Jung',
          'birth_year': 1981,
          race: 'Asian/Pacific',
          gender: 'Male',
          percentile: {
            year: 2016,
          },
          rank: 'Police Officer',
          'complaint_count': 61,
          'sustained_count': 1,
        },
        officer2: {
          id: 25602,
          'full_name': 'Matthew Schaller',
          'birth_year': 1983,
          race: 'White',
          gender: 'Male',
          percentile: {
            year: 2017,
          },
          rank: 'Sergeant of Police',
          'complaint_count': 27,
          'sustained_count': 0,
        },
        'coaccusal_count': 0,
        kind: 'coaccused_pair',
      }, {
        officer1: {
          id: 13421,
          'full_name': 'Melinda May',
          'birth_year': 1990,
          race: 'Asian/Pacific',
          gender: 'Male',
          percentile: {
            year: 2013,
          },
          rank: 'Police Officer',
          'complaint_count': 30,
          'sustained_count': 1,
        },
        officer2: {
          id: 47383,
          'full_name': 'Phil Coulson',
          'birth_year': 1988,
          race: 'White',
          gender: 'Male',
          percentile: {
            year: 2011,
          },
          rank: 'Sergeant of Police',
          'complaint_count': 11,
          'sustained_count': 0,
        },
        'coaccusal_count': 9,
        kind: 'coaccused_pair',
      }];
      const cards = cardsSelector(state);
      const pairCards = [pinnedPairingCardTransform({
        officer1: {
          id: 13937,
          'full_name': 'Jaeho Jung',
          'birth_year': 1981,
          race: 'Asian/Pacific',
          gender: 'Male',
          percentile: {
            year: 2016,
          },
          rank: 'Police Officer',
          'complaint_count': 61,
          'sustained_count': 1,
        },
        officer2: {
          id: 25602,
          'full_name': 'Matthew Schaller',
          'birth_year': 1983,
          race: 'White',
          gender: 'Male',
          percentile: {
            year: 2017,
          },
          rank: 'Sergeant of Police',
          'complaint_count': 27,
          'sustained_count': 0,
          isPinned: false,
        },
        'coaccusal_count': 0,
        kind: 'coaccused_pair',
      }), pinnedPairingCardTransform({
        officer1: {
          id: 13421,
          'full_name': 'Melinda May',
          'birth_year': 1990,
          race: 'Asian/Pacific',
          gender: 'Male',
          percentile: {
            year: 2013,
          },
          rank: 'Police Officer',
          'complaint_count': 30,
          'sustained_count': 1,
          isPinned: false,
        },
        officer2: {
          id: 47383,
          'full_name': 'Phil Coulson',
          'birth_year': 1988,
          race: 'White',
          gender: 'Male',
          percentile: {
            year: 2011,
          },
          rank: 'Sergeant of Police',
          'complaint_count': 11,
          'sustained_count': 0,
          isPinned: false,
        },
        'coaccusal_count': 9,
        kind: 'coaccused_pair',
      })];
      cards.should.have.length(4);
      lodash.some(pairCards, cards[0]).should.be.true();
    });
  });

  describe('hasCards', function () {
    it('should return true if activityGrid has data', function () {
      state.landingPage.activityGrid.cards = ['abc'];
      hasCards(state).should.be.true();
    });

    it('should return false if activityGrid does not have data', function () {
      state.landingPage.activityGrid.cards = [];
      hasCards(state).should.be.false();
    });
  });
});
