import { SELECT_TAG } from 'actions/search-page';
import contentType from 'reducers/search-page/content-type';


describe('searchPage.contentType reducer', function () {
  it('should have initial state', function () {
    (contentType(undefined, {}) === null).should.be.true();
  });

  it('should handle SELECT_TAG', function () {
    contentType(undefined, {
      type: SELECT_TAG,
      payload: 'a'
    }).should.equal('a');
  });
});
