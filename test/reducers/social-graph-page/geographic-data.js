import geographicData from 'reducers/social-graph-page/geographic-data';
import { GEOGRAPHIC_REQUEST_SUCCESS } from 'utils/constants';


describe('geographicData reducer', function () {
  it('should have initial state', function () {
    geographicData(undefined, {}).should.eql([]);
  });

  it('should handle GEOGRAPHIC_REQUEST_SUCCESS', function () {
    geographicData([], {
      type: GEOGRAPHIC_REQUEST_SUCCESS,
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
