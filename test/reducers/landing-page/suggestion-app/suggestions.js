import {
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
} from 'actions/landing-page/suggestion';
import suggestions from 'reducers/landing-page/suggestion-app/suggestions';


describe('suggestionApp.suggestions reducer', function () {
  it('should have initial state', function () {
    suggestions(undefined, {}).should.deepEqual([]);
  });

  it('should handle SUGGESTION_REQUEST_START', function () {
    suggestions(undefined, {
      type: SUGGESTION_REQUEST_START
    }).should.deepEqual([]);
  });

  it('should handle SUGGESTION_REQUEST_START', function () {
    suggestions(undefined, {
      type: SUGGESTION_REQUEST_FAILURE
    }).should.deepEqual([]);
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    suggestions(undefined, {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'neighborhoods': [{
          options: [{ a: 1 }]
        }],
        'officer_badge_number': [{
          options: [{ b: 2 }]
        }],
        'officer_name': [{
          options: [{ c: 3 }]
        }]
      }
    }).should.deepEqual([
      { a: 1 },
      { b: 2 },
      { c: 3 }
    ]);
  });
});
