import { SUGGESTION_REQUEST_SUCCESS, SUGGESTION_SINGLE_REQUEST_SUCCESS } from 'utils/constants';

import tags from 'reducers/search-page/tags';


describe('searchPage.tags reducer', function () {
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

  it('should return content type when SUGGESTION_SINGLE_REQUEST_SUCCESS', function () {
    tags(['a', 'b'], {
      type: SUGGESTION_SINGLE_REQUEST_SUCCESS,
      payload: {
        'a': [{}],
        'b': [{}]
      },
      request: {
        params: {
          contentType: 'c'
        }
      }
    }).should.deepEqual(['c']);
  });
});
