import lodash from 'lodash';
import sinon from 'sinon';

import { cardsSelector, hasCards } from 'selectors/landing-page/activity-grid';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid.js';


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
          birthYear: 1970,
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
          birthYear: 1970,
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
      const stubShuffle = sinon.spy(lodash, 'shuffle');
      state.landingPage.activityGrid.cards = lodash.range(40);

      cardsSelector(state);

      stubShuffle.calledWith(lodash.range(0, 12)).should.be.true();
      stubShuffle.calledWith(lodash.range(12, 40)).should.be.true();

      stubShuffle.restore();
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
