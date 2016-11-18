import {
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
} from 'actions/landing-page/suggestion-action';
import suggestionAppIsRequesting from 'reducers/landing-page/suggestion-app/is-requesting';


describe('suggestionAppIsRequesting reducer', function () {
  it('should return initial state', function () {
    suggestionAppIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_START', function () {
    suggestionAppIsRequesting(undefined, {
      type: SUGGESTION_REQUEST_START
    }).should.be.true();
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    suggestionAppIsRequesting(true, {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    suggestionAppIsRequesting(true, {
      type: SUGGESTION_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
