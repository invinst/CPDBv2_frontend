import should from 'should';

import cachedDataReducer from 'reducers/pinboard-admin-page/graph-data/cached-data';
import { PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS } from 'utils/constants';


describe('cachedDataReducer', function () {
  it('should have initial state', function () {
    should(cachedDataReducer(undefined, {})).be.empty();
  });

  it('should handle PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS', function () {
    cachedDataReducer(
      [
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6789',
        },
      ],
      {
        type: PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
        request: {
          params: { 'pinboard_id': 'abcd1234' },
        },
        payload: {
          title: 'Pinboard Title',
          description: '',
        },
      }
    ).should.be.eql([
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6789',
      },
      {
        title: 'Pinboard Title',
        description: '',
        'pinboard_id': 'abcd1234',
      },
    ]);
  });

  it('should keep only newest data', function () {
    cachedDataReducer(
      [
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6781',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6782',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6783',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6784',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6785',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6786',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6787',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6788',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6789',
        },
        {
          title: 'Cached Pinboard Title',
          description: '',
          'pinboard_id': 'cdef6790',
        },
      ],
      {
        type: PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
        request: {
          params: { 'pinboard_id': 'abcd1234' },
        },
        payload: {
          title: 'Pinboard Title',
          description: '',
        },
      }
    ).should.be.eql([
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6782',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6783',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6784',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6785',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6786',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6787',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6788',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6789',
      },
      {
        title: 'Cached Pinboard Title',
        description: '',
        'pinboard_id': 'cdef6790',
      },
      {
        title: 'Pinboard Title',
        description: '',
        'pinboard_id': 'abcd1234',
      },
    ]);
  });
});
