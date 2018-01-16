import {
  SUGGESTION_REQUEST_START, SELECT_TAG
} from 'actions/search-page';
import { SUGGESTION_SINGLE_REQUEST_START } from 'utils/constants';
import contentType from 'reducers/search-page/content-type';


describe('searchPage.contentType reducer', function () {
  it('should have initial state', function () {
    (contentType(undefined, {}) === null).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_START if has contentType', function () {
    contentType(undefined, {
      type: SUGGESTION_REQUEST_START,
      payload: {
        request: {
          params: {
            contentType: 'a'
          }
        }
      }
    }).should.equal('a');
  });

  it('should return null on SUGGESTION_REQUEST_START if has no contentType', function () {
    (contentType(undefined, {
      type: SUGGESTION_REQUEST_START,
      payload: {
        request: {
        }
      }
    }) === null).should.be.true();
  });

  it('should handle SELECT_TAG', function () {
    contentType(undefined, {
      type: SELECT_TAG,
      payload: 'a'
    }).should.equal('a');
  });

  it('should handle SUGGESTION_SINGLE_REQUEST_START when content type exists', function () {
    contentType(undefined, {
      type: SUGGESTION_SINGLE_REQUEST_START,
      payload: {
        request: {
          params: {
            contentType: 'a'
          }
        }
      }
    }).should.equal('a');
  });

  it('should return null on SUGGESTION_SINGLE_REQUEST_START if has no contentType', function () {
    (contentType(undefined, {
      type: SUGGESTION_SINGLE_REQUEST_START,
      payload: {
        request: {
        }
      }
    }) === null).should.be.true();
  });
});
