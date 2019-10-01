import { getQuery } from 'selectors/search-page/common';
import { isItemPinned } from 'selectors/pinboard-page/pinboard';


describe('SearchPage common selectors', function () {
  const state = {
    searchPage: {
      query: 'summary',
    },
  };

  describe('getQuery', function () {
    it('should return correct query', function () {
      getQuery(state).should.be.eql('summary');
    });
  });

  describe('isItemPinned', function () {
    const pinboardItems = {
      'OFFICER': ['8562', '8563'],
      'CR': ['C12345'],
      'TRR': [],
    };

    it('should return true if item was added to pinboard', function () {
      isItemPinned('OFFICER', 8562, pinboardItems).should.be.true();
    });

    it('should return false if item was not added to pinboard', function () {
      isItemPinned('CR', '123456', pinboardItems).should.be.false();
    });
  });
});
