import {
  SUGGESTION_REQUEST_START, SELECT_TAG
} from 'actions/landing-page/suggestion';
import contentType from 'reducers/landing-page/suggestion-app/content-type';


describe('suggestionApp.contentType reducer', function () {
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
      action: {
        payload: {
          request: {
          }
        }
      }
    }) === null).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_START', function () {
    contentType(undefined, {
      type: SELECT_TAG,
      payload: 'a'
    }).should.equal('a');
  });
});
