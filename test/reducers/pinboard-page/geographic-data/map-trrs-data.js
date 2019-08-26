import mapTrrsData from 'reducers/pinboard-page/geographic-data/map-trrs-data';
import {
  PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
} from 'utils/constants';


describe('mapTrrsData reducer', function () {
  it('should have initial state', function () {
    mapTrrsData(undefined, {}).should.eql([]);
  });

  it('should handle PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START', function () {
    mapTrrsData({
      results: [
        {
          'date': '2007-04-25',
          'trr_id': '123456',
          'category': 'Use Of Force',
          'kind': 'TRR',
          'point': {
            'lon': -87,
            'lat': 35,
          },
        },
      ],
    }, {
      type: PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START,
      payload: {
        results: [
          {
            'date': '2008-04-25',
            'trr_id': '654321',
            'category': 'Use Of Force',
            'kind': 'TRR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
      },
    }).should.eql([]);
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS', function () {
    mapTrrsData([], {
      type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'trr_id': '123456',
            'category': 'Use Of Force',
            'kind': 'TRR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
      },
    }).should.eql([
      {
        'date': '2007-04-25',
        'trr_id': '123456',
        'category': 'Use Of Force',
        'kind': 'TRR',
        'point': {
          'lon': -87,
          'lat': 35,
        },
      },
    ]);
  });

  it('should handle PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS', function () {
    mapTrrsData([], {
      type: PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'trr_id': '123456',
            'category': 'Use Of Force',
            'kind': 'TRR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
      },
    }).should.eql([
      {
        'date': '2007-04-25',
        'trr_id': '123456',
        'category': 'Use Of Force',
        'kind': 'TRR',
        'point': {
          'lon': -87,
          'lat': 35,
        },
      },
    ]);
  });
});
