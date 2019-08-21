import { cardsSelector, hasCards } from 'selectors/landing-page/recent-document';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';


describe('recent-document selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        recentDocument: {},
      },
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.recentDocument.cards = RawDocumentCardFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });
  });

  describe('hasCards', function () {
    it('should return true if recentDocument has data', function () {
      state.landingPage.recentDocument.cards = ['abc'];
      hasCards(state).should.be.true();
    });

    it('should return false if recentDocument does not have data', function () {
      state.landingPage.recentDocument.cards = [];
      hasCards(state).should.be.false();
    });
  });
});
