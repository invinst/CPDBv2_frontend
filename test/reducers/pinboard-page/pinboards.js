import pinboardsReducer from 'reducers/pinboard-page/pinboards';
import { PINBOARDS_FETCH_REQUEST_SUCCESS, REMOVE_PINBOARD_REQUEST_SUCCESS } from 'utils/constants';


describe('pinboards reducer', function () {
  it('should return initial state', function () {
    pinboardsReducer(undefined, {}).should.eql([]);
  });

  it('should handle PINBOARDS_FETCH_REQUEST_SUCCESS', function () {
    const action = {
      type: PINBOARDS_FETCH_REQUEST_SUCCESS,
      payload: [
        {
          'id': '7f476749',
          'title': '',
          'created_at': '2020-05-06',
          'last_viewed_at': '2020-06-15T03:17:24.263599Z',
        },
        {
          'id': '7f476761',
          'title': 'Pinboard 1',
          'created_at': '2020-05-06',
          'last_viewed_at': '2020-06-10T09:49:44.077826Z',
        },
        {
          'id': '7f476777',
          'title': 'Skrull Cap',
          'created_at': '2020-05-06',
          'last_viewed_at': '2020-06-10T09:35:11.716893Z',
        },
      ],
    };
    pinboardsReducer([], action).should.eql([
      {
        'id': '7f476749',
        'title': '',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-15T03:17:24.263599Z',
      },
      {
        'id': '7f476761',
        'title': 'Pinboard 1',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-10T09:49:44.077826Z',
      },
      {
        'id': '7f476777',
        'title': 'Skrull Cap',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-10T09:35:11.716893Z',
      },
    ]);
  });

  it('handling REMOVE_PINBOARD_REQUEST_SUCCESS', function () {
    const pinboards = [
      {
        'id': '7f476749',
        'title': '',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-15T03:17:24.263599Z',
      },
      {
        'id': '7f476761',
        'title': 'Pinboard 1',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-10T09:49:44.077826Z',
      },
      {
        'id': '7f476777',
        'title': 'Skrull Cap',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-10T09:35:11.716893Z',
      },
    ];
    const action = {
      type: REMOVE_PINBOARD_REQUEST_SUCCESS,
      request: { url: 'http://localhost:8000/api/v2/pinboards/7f476777/' },
    };
    pinboardsReducer(pinboards, action).should.eql([
      {
        'id': '7f476749',
        'title': '',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-15T03:17:24.263599Z',
      },
      {
        'id': '7f476761',
        'title': 'Pinboard 1',
        'created_at': '2020-05-06',
        'last_viewed_at': '2020-06-10T09:49:44.077826Z',
      },
    ]);
  });
});
