import networkAllegations from 'reducers/social-graph-page/network-data/network-allegations';

import { SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS } from 'utils/constants';


describe('networkAllegations reducer', function () {
  it('should return initial state', function () {
    networkAllegations(undefined, {}).should.eql([]);
  });

  it('should handle SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS', function () {
    const graphAllegationsData = [
      {
        'crid': 123,
        'incident_date': '1988-10-03',
        'most_common_category': {
          'category': 'Use of Force',
          'allegation_name': 'Miscellaneous'
        }
      },
      {
        'crid': 456,
        'incident_date': '1989-14-05',
        'most_common_category': {
          'category': 'Illegal Search',
        }
      }
    ];

    networkAllegations([], {
      type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
      payload: graphAllegationsData
    }).should.eql(graphAllegationsData);
  });
});

