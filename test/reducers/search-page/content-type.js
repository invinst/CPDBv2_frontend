import { SELECT_TAG } from 'utils/constants';
import contentType from 'reducers/search-page/content-type';
import { LOCATION_CHANGE } from 'utils/constants';


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
  it('should handle LOCATION_CHANGE', function () {
    contentType(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        query: {
          type: 'community'
        }
      }
    }).should.eql('community');
  });
});
