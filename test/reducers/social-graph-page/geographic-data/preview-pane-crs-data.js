import previewPaneCrsData from 'reducers/social-graph-page/geographic-data/preview-pane-crs-data';
import {
  FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS,
  GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS
} from 'utils/constants';


describe('previewPaneCrsData reducer', function () {
  it('should have initial state', function () {
    previewPaneCrsData(undefined, {}).should.eql([]);
  });

  it('should handle FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS', function () {
    previewPaneCrsData([], {
      type: FIRST_PAGE_GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'to': '/complaint/123456/',
            'crid': '123456',
            'category': 'Firearm',
            'kind': 'CR',
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
        ],
      }
    }).should.eql([
      {
        'date': '2007-04-25',
        'to': '/complaint/123456/',
        'crid': '123456',
        'category': 'Firearm',
        'kind': 'CR',
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

  it('should handle GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS', function () {
    previewPaneCrsData([], {
      type: GEOGRAPHIC_CRS_PREVIEW_PANE_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'to': '/complaint/123456/',
            'crid': '123456',
            'category': 'Firearm',
            'kind': 'CR',
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
        ],
      }
    }).should.eql([
      {
        'date': '2007-04-25',
        'to': '/complaint/123456/',
        'crid': '123456',
        'category': 'Firearm',
        'kind': 'CR',
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
