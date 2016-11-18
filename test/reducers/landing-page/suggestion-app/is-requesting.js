import {
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
} from 'actions/landing-page/suggestion';
import isRequesting from 'reducers/landing-page/suggestion-app/is-requesting';


describe('suggestionApp.isRequesting reducer', function () {
  it('should have initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle SUGGESTION_REQUEST_START', function () {
    isRequesting(undefined, {
      type: SUGGESTION_REQUEST_START
    }).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    isRequesting(undefined, {
      type: SUGGESTION_REQUEST_SUCCESS
    }).should.be.false();
  });

  it('should handle SUGGESTION_REQUEST_FAILURE', function () {
    isRequesting(undefined, {
      type: SUGGESTION_REQUEST_FAILURE
    }).should.be.false();
  });
});
