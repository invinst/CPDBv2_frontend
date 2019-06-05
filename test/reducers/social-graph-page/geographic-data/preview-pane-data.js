import previewPaneData from 'reducers/social-graph-page/geographic-data/preview-pane-data';
import { SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_SUCCESS } from 'utils/constants';


describe('previewPaneData reducer', function () {
  it('should have initial state', function () {
    previewPaneData(undefined, {}).should.eql([]);
  });

  it('should handle SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_SUCCESS', function () {
    previewPaneData([], {
      type: SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_SUCCESS,
      payload: [
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
      ]
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
