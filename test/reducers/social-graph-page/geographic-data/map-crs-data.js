import mapCrsData from 'reducers/social-graph-page/geographic-data/map-crs-data';
import { FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS, GEOGRAPHIC_CRS_REQUEST_SUCCESS } from 'utils/constants';


describe('mapCrsData reducer', function () {
  it('should have initial state', function () {
    mapCrsData(undefined, {}).should.eql([]);
  });

  it('should handle FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS', function () {
    mapCrsData([], {
      type: FIRST_PAGE_GEOGRAPHIC_CRS_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'crid': '123456',
            'category': 'Award',
            'coaccused': 3,
            'kind': 'CR',
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
        'crid': '123456',
        'category': 'Award',
        'coaccused': 3,
        'kind': 'CR',
        'point': {
          'lon': -87,
          'lat': 35
        },
      }
    ]);
  });

  it('should handle GEOGRAPHIC_CRS_REQUEST_SUCCESS', function () {
    mapCrsData([], {
      type: GEOGRAPHIC_CRS_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'crid': '123456',
            'category': 'Award',
            'coaccused': 3,
            'kind': 'CR',
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
        'crid': '123456',
        'category': 'Award',
        'coaccused': 3,
        'kind': 'CR',
        'point': {
          'lon': -87,
          'lat': 35
        },
      }
    ]);
  });
});
