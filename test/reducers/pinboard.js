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
        ownedByCurrentUser: false,
      },
      {
        type: constants.PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      ownedByCurrentUser: true,
    });
  });

  it('should handle PINBOARD_UPDATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        ownedByCurrentUser: false,
      },
      {
        type: constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      ownedByCurrentUser: false,
    });
  });

  context('handling PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    it('should set ownedByCurrentUser as False if current pinboard is null', function () {
      pinboardReducer(
        {
          id: null,
          ownedByCurrentUser: false,
        },
        {
          type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
          payload: {
            id: 1,
          }
        }
      ).should.deepEqual({
        id: 1,
        ownedByCurrentUser: false
      });
    });

    it('should set ownedByCurrentUser as False if fetched and current pinboard are not alike', function () {
      pinboardReducer(
        {
          id: 1,
          ownedByCurrentUser: true,
        },
        {
          type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
          payload: {
            id: 2,
          }
        }
      ).should.deepEqual({
        id: 2,
        ownedByCurrentUser: false
      });
    });

    context('when fetched and current pinboard are like', function () {
      it('should set ownedByCurrentUser as True if ownedByCurrentUser is True', function () {
        pinboardReducer(
          {
            id: 1,
            ownedByCurrentUser: true,
          },
          {
            type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
            payload: {
              id: 1,
            }
          }
        ).should.deepEqual({
          id: 1,
          ownedByCurrentUser: true
        });
      });

      it('should set ownedByCurrentUser as False if ownedByCurrentUser is False', function () {
        pinboardReducer(
          {
            id: 1,
            ownedByCurrentUser: false,
          },
          {
            type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
            payload: {
              id: 1,
            }
          }
        ).should.deepEqual({
          id: 1,
          ownedByCurrentUser: false
        });
      });
    });
  });
});
