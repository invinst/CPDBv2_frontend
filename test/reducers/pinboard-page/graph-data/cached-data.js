import should from 'should';

import cachedDataReducer from 'reducers/pinboard-page/graph-data/cached-data';
import { PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS } from 'utils/constants';


describe('cachedDataReducer', function () {
  it('should have initial state', function () {
    should(cachedDataReducer(undefined, {})).be.empty();
  });

  it('should handle PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS', function () {
    cachedDataReducer(
      {
        'cdef6789': {
          'pinboard_id': 'cdef6789',
          title: 'Cached Pinboard Title',
          description: '',
        },
      },
      {
        type: PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
        payload: {
          'pinboard_id': 'abcd1234',
          title: 'Pinboard Title',
          description: '',
        },
      }
    ).should.be.eql({
      'cdef6789': {
        'pinboard_id': 'cdef6789',
        title: 'Cached Pinboard Title',
        description: '',
      },
      'abcd1234': {
        'pinboard_id': 'abcd1234',
        title: 'Pinboard Title',
        description: '',
      },
    });
  });
});
