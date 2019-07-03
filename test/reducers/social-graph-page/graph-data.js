import graphData from 'reducers/social-graph-page/graph-data';

import { SOCIAL_GRAPH_REQUEST_SUCCESS } from 'utils/constants';


describe('graphData reducer', function () {
  it('should return initial state', function () {
    graphData(undefined, {}).should.eql({});
  });

  it('should handle SOCIAL_GRAPH_REQUEST_SUCCESS', function () {
    graphData([], {
      type: SOCIAL_GRAPH_REQUEST_SUCCESS,
      payload: {
        officers: [{
          'full_name': 'Jerome Finnigan',
          'id': '13759'
        }, {
          'full_name': 'Edward May',
          'id': '27557',
        }],
        'coaccused_data': [{
          'officer_id_1': 13759,
          'officer_id_2': 27557,
          'incident_date': '1988-10-03T00:00:00Z',
          'accussed_count': 1
        }],
        'list_event': [
          '1988-10-03 00:00:00+00:00',
        ],
      }
    }).should.eql({
      officers: [{
        'full_name': 'Jerome Finnigan',
        'id': '13759'
      }, {
        'full_name': 'Edward May',
        'id': '27557',
      }],
      'coaccused_data': [{
        'officer_id_1': 13759,
        'officer_id_2': 27557,
        'incident_date': '1988-10-03T00:00:00Z',
        'accussed_count': 1
      }],
      'list_event': [
        '1988-10-03 00:00:00+00:00',
      ],
    });
  });
});

