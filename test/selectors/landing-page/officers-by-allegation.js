import { cardsSelector } from 'selectors/landing-page/officers-by-allegation';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';
import lodash from 'lodash';
import { spy } from 'sinon';

describe('officers-by-allegation selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        officersByAllegation: {}
      }
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.officersByAllegation.cards = RawOfficerCardFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
      state.landingPage.officersByAllegation.cards = lodash.range(40);

      cardsSelector(state);

      stubShuffle.calledWith(lodash.range(0, 12)).should.be.true();
      stubShuffle.calledWith(lodash.range(12, 40)).should.be.true();

      stubShuffle.restore();
    });

  });
});
