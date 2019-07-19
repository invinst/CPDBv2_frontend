import mapTrrsData from 'reducers/social-graph-page/geographic-data/map-trrs-data';
import { FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS, GEOGRAPHIC_TRRS_REQUEST_SUCCESS } from 'utils/constants';


describe('mapTrrsData reducer', function () {
  it('should have initial state', function () {
    mapTrrsData(undefined, {}).should.eql([]);
  });

  it('should handle FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS', function () {
    mapTrrsData([], {
      type: FIRST_PAGE_GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'trr_id': '123456',
            'category': 'Use Of Force',
            'kind': 'TRR',
            'point': {
              'lon': -87,
              'lat': 35
            },
          }
        ],
      }
    }).should.eql([
      {
        'date': '2007-04-25',
        'trr_id': '123456',
        'category': 'Use Of Force',
        'kind': 'TRR',
        'point': {
          'lon': -87,
          'lat': 35
        },
      }
    ]);
  });

  it('should handle GEOGRAPHIC_TRRS_REQUEST_SUCCESS', function () {
    mapTrrsData([], {
      type: GEOGRAPHIC_TRRS_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'trr_id': '123456',
            'category': 'Use Of Force',
            'kind': 'TRR',
            'point': {
              'lon': -87,
              'lat': 35
            },
          }
        ]
      }
    }).should.eql([
      {
        'date': '2007-04-25',
        'trr_id': '123456',
        'category': 'Use Of Force',
        'kind': 'TRR',
        'point': {
          'lon': -87,
          'lat': 35
        },
      }
    ]);
  });
});
