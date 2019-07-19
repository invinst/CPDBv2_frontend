import previewPaneTrrsData from 'reducers/social-graph-page/geographic-data/preview-pane-trrs-data';
import {
  FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS,
  GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS
} from 'utils/constants';


describe('previewPaneCrsData reducer', function () {
  it('should have initial state', function () {
    previewPaneTrrsData(undefined, {}).should.eql([]);
  });

  it('should handle FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS', function () {
    previewPaneTrrsData([], {
      type: FIRST_PAGE_GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'to': '/trr/123456/',
            'trr_id': '123456',
            'category': 'Use Of Force',
            'kind': 'TRR',
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
        'to': '/trr/123456/',
        'trr_id': '123456',
        'category': 'Use Of Force',
        'kind': 'TRR',
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

  it('should handle GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS', function () {
    previewPaneTrrsData([], {
      type: GEOGRAPHIC_TRRS_PREVIEW_PANE_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'to': '/trr/123456/',
            'trr_id': '123456',
            'category': 'Use Of Force',
            'kind': 'TRR',
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
        'to': '/trr/123456/',
        'trr_id': '123456',
        'category': 'Use Of Force',
        'kind': 'TRR',
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
