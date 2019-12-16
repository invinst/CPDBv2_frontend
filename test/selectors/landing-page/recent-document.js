import { cardsSelector, hasCards } from 'selectors/landing-page/recent-document';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';


describe('recent-document selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        recentDocument: {},
      },
      pinboardPage: { pinboard: { crids: ['1', '2', '3'] } },
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.recentDocument.cards = RawDocumentCardFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should add isPinned attr', function () {
      state.landingPage.recentDocument.cards = [
        RawDocumentCardFactory.build({ crid: '1' }),
        RawDocumentCardFactory.build({ crid: '99' }),
      ];

      const cards = cardsSelector(state);
      cards.should.have.length(2);
      cards[0].isPinned.should.be.true();
      cards[1].isPinned.should.be.false();
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
