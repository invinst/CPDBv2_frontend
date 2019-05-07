import should from 'should';

import pinboardReducer from 'reducers/pinboard';
import * as constants from 'utils/constants';


describe('Pinboard reducer', function () {
  it('should have initial state', function () {
    should(pinboardReducer(undefined, {})).eql(null);
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
    });
  });

  it('should handle PINBOARD_UPDATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {},
      {
        type: constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
    });
  });

  it('should handle PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
    });
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 1,
        crItems: [{ id: 1 }],
      },
      {
        type: constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual({
      id: 1,
      crItems: [{ id: 2 }, { id: 3 }],
    });
  });

  it('should handle PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 1,
        officerItems: [{ id: 1 }],
      },
      {
        type: constants.PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual({
      id: 1,
      officerItems: [{ id: 2 }, { id: 3 }],
    });
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 1,
        trrItems: [{ id: 1 }],
      },
      {
        type: constants.PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual({
      id: 1,
      trrItems: [{ id: 2 }, { id: 3 }],
    });
  });

  it('should handle PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {},
      {
        type: constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
        payload: {
          id: 1,
        }
      }
    ).should.deepEqual({
      id: 1,
      isPinboardRestored: true,
    });
  });
});
