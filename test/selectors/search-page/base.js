import { isShowingSingleContentTypeSelector } from 'selectors/search-page/search-results';

describe('isShowingSingleContentTypeSelector', function () {
  it('should tell if showing single type of content', function () {
    isShowingSingleContentTypeSelector({
      searchPage: {
        contentType: 'OFFICER',
        tags: []
      }
    }).should.be.true();
    isShowingSingleContentTypeSelector({
      searchPage: {
        contentType: null,
        tags: [1]
      }
    }).should.be.true();
    isShowingSingleContentTypeSelector({
      searchPage: {
        tags: []
      },
    }).should.be.false();
  });
});
