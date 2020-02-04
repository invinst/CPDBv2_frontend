import lodash from 'lodash';
import sinon from 'sinon';

import { cardsSelector, hasCards } from 'selectors/landing-page/officers-by-allegation';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';


describe('officers-by-allegation selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        officersByAllegation: {},
      },
      pinboardPage: { pinboard: { 'officer_ids': ['1', '2', '3'] } },
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.officersByAllegation.cards = RawOfficerCardFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should add isPinned attr', function () {
      state.landingPage.officersByAllegation.cards = [
        RawOfficerCardFactory.build({ id: 1 }),
        RawOfficerCardFactory.build({ id: 99 }),
      ];

      const cards = cardsSelector(state);
      cards.should.have.length(2);
      [cards[0].isPinned, cards[1].isPinned].sort().should.be.eql([false, true]);
    });

    it('should shuffle cards', function () {
      const stubShuffle = sinon.spy(lodash, 'shuffle');
      state.landingPage.officersByAllegation.cards = lodash.range(40);

      cardsSelector(state);

      stubShuffle.calledWith(lodash.range(0, 12)).should.be.true();
      stubShuffle.calledWith(lodash.range(12, 40)).should.be.true();
    });
  });

  describe('hasCards', function () {
    it('should return true if officersByAllegation has data', function () {
      state.landingPage.officersByAllegation.cards = ['abc'];
      hasCards(state).should.be.true();
    });

    it('should return false if officersByAllegation does not have data', function () {
      state.landingPage.officersByAllegation.cards = [];
      hasCards(state).should.be.false();
    });
  });
});
