import { SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_START, LOCATION_CHANGE } from 'utils/constants';

import tags from 'reducers/search-page/tags';


describe('searchPage.tags reducer', function () {
  it('should have initial state', function () {
    tags(undefined, {}).should.deepEqual([]);
  });

  it('should return clear tags when SUGGESTION_REQUEST_START', function () {
    tags(['a', 'b'], {
      type: SUGGESTION_REQUEST_START,
      payload: {},
    }).should.deepEqual([]);
  });

  it('should return all tags when SUGGESTION_REQUEST_SUCCESS if has no contentType', function () {
    tags(undefined, {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'a': [{}],
        'b': [{}],
      },
    }).should.deepEqual(['a', 'b']);
  });

  it('should keep current state when SUGGESTION_REQUEST_SUCCESS if has contentType', function () {
    tags(['a', 'b'], {
      type: SUGGESTION_REQUEST_SUCCESS,
      payload: {
        'a': [{}],
        'b': [{}],
      },
      request: {
        params: {
          contentType: 'b',
        },
      },
    }).should.deepEqual(['a', 'b']);
  });

  it('should handle LOCATION_CHANGE with correct contentType', function () {
    tags(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        query: {
          type: 'COMMUNITY',
        },
      },
    }).should.eql(['COMMUNITY']);
  });

  it('should handle LOCATION_CHANGE with wrong contentType', function () {
    tags(undefined, {
      type: LOCATION_CHANGE,
      payload: {
        query: {
          type: 'COMMUNITY',
        },
      },
    }).should.eql(['COMMUNITY']);
  });
});
