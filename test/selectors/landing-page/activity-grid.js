import lodash from 'lodash';
import { spy } from 'sinon';

import { cardsSelector, hasCards, singleCardsSelector } from 'selectors/landing-page/activity-grid';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid.js';


describe('activity-grid selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        activityGrid: {}
      }
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.activityGrid.cards = RawOfficerCardFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should transform correctly', function () {
      state.landingPage.activityGrid.cards = [{
        id: '1',
        'full_name': 'someone',
        'visual_token_background_color': 'red',
        'complaint_count': 10,
        'sustained_count': 5,
        'complaint_percentile': 80,
        'birth_year': 1970,
        race: 'Black',
        rank: 'Police Officer',
        gender: 'Female',
        type: 'single_officer',
      }];
      cardsSelector(state).should.eql([{
        id: '1',
        officerId: '1',
        fullName: 'someone',
        complaintCount: 10,
        sustainedCount: 5,
        complaintPercentile: 80,
        birthYear: 1970,
        race: 'black',
        rank: 'Police Officer',
        gender: 'female',
        percentile: null,
        type: 'single_officer',
      }]);
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
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

  describe('singleCardsSelector', function () {
    it('should return correct officer cards', function () {
      state.landingPage.activityGrid.cards = [{
        id: '1',
        'full_name': 'someone',
        'visual_token_background_color': 'red',
        'complaint_count': 10,
        'sustained_count': 5,
        'complaint_percentile': 80,
        'birth_year': 1970,
        race: 'Black',
        rank: 'Police Officer',
        gender: 'Female',
        type: 'single_officer',
      }];
      singleCardsSelector(state).should.eql([{
        id: '1',
        officerId: '1',
        fullName: 'someone',
        complaintCount: 10,
        sustainedCount: 5,
        complaintPercentile: 80,
        birthYear: 1970,
        race: 'black',
        rank: 'Police Officer',
        gender: 'female',
        percentile: null,
        type: 'single_officer',
      }]);
    });
  });
});
