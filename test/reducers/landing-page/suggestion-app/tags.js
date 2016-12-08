import { SUGGESTION_REQUEST_SUCCESS } from 'actions/landing-page/suggestion';

import tags from 'reducers/landing-page/suggestion-app/tags';


describe('suggestionApp.tags reducer', function () {
  it('should have initial state', function () {
    tags(undefined, {}).should.deepEqual([]);
  });

  it('should return all tags when SUGGESTION_REQUEST_SUCCESS if has no contentType', function () {
    tags(undefined, {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'a': [{}],
        'b': [{}]
      }
    }).should.deepEqual(['a', 'b']);
  });

  it('should keep current state when SUGGESTION_REQUEST_SUCCESS if has contentType', function () {
    tags(['a', 'b'], {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'a': [{}],
        'b': [{}]
      },
      request: {
        params: {
          contentType: 'b'
        }
      }
    }).should.deepEqual(['a', 'b']);
  });
});
