import geographicData from 'reducers/pinboard-page/geographic-data/data';
import { PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS } from 'utils/constants';


describe('geographicData reducer', function () {
  it('should have initial state', function () {
    geographicData(undefined, {}).should.eql([]);
  });

  it('should handle PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS', function () {
    geographicData([], {
      type: PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS,
      payload: [
        {
          'date': '2007-04-25',
          'crid': '123456',
          'category': 'Use Of Force',
          'coaccused': 3,
          'kind': 'CR',
          'point': {
            'lon': -87,
            'lat': 35
          },
          'victims': [
            {
              'gender': 'Male',
              'race': ''
            },
            {
              'gender': 'Male',
              'race': ''
            },
            {
              'gender': 'Male',
              'race': ''
            },
            {
              'gender': 'Male',
              'race': 'Black'
            },
            {
              'gender': 'Male',
              'race': ''
            }
          ]
        }
      ]
    }).should.eql([
      {
        'date': '2007-04-25',
        'crid': '123456',
        'category': 'Use Of Force',
        'coaccused': 3,
        'kind': 'CR',
        'point': {
          'lon': -87,
          'lat': 35
        },
        'victims': [
          {
            'gender': 'Male',
            'race': ''
          },
          {
            'gender': 'Male',
            'race': ''
          },
          {
            'gender': 'Male',
            'race': ''
          },
          {
            'gender': 'Male',
            'race': 'Black'
          },
          {
            'gender': 'Male',
            'race': ''
          }
        ]
      }
    ]);
  });
});
