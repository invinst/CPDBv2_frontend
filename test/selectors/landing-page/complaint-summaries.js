import { cardsSelector, } from 'selectors/landing-page/complaint-summaries';
import { RawComplaintSummaryFactory } from 'utils/test/factories/complaint';
import lodash from 'lodash';
import { spy } from 'sinon';

describe('complaint-summaries selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        complaintSummaries: {}
      }
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.complaintSummaries.cards = RawComplaintSummaryFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should drop out unknown category', function () {
      state.landingPage.complaintSummaries.cards = [RawComplaintSummaryFactory.build({
        'category_names': ['Use Of Forces', 'Unknown']
      })];
      const result = cardsSelector(state);
      result[0].categoryNames.should.have.length(1);
      result[0].categoryNames[0].should.eql('Use Of Forces');
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
      state.landingPage.complaintSummaries.cards = lodash.range(40);

      cardsSelector(state);

      stubShuffle.calledWith(lodash.range(0, 12)).should.be.true();
      stubShuffle.calledWith(lodash.range(12, 40)).should.be.true();

      stubShuffle.restore();
    });

  });
});
