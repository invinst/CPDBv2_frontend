import currentTab from 'reducers/pinboard-page/current-tab';
import { CHANGE_PINBOARD_TAB, PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS } from 'utils/constants';


describe('currentTab reducer', function () {
  it('should have initial state', function () {
    currentTab(undefined, {}).should.eql('NETWORK');
  });

  it('should handle CHANGE_PINBOARD_TAB', function () {
    currentTab(undefined, {
      type: CHANGE_PINBOARD_TAB,
      payload: 'GEOGRAPHIC'
    }).should.eql('GEOGRAPHIC');
  });

  it('should handle PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS', function () {
    currentTab(undefined, {
      type: PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
      payload: {
        'coaccused_data': []
      }
    }).should.eql('GEOGRAPHIC');

    currentTab('NETWORK', {
      type: PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
      payload: {
        'coaccused_data': [{
          'officer_id_1': 1,
          'officer_id_2': 2,
          'incident_date': '1988-10-03T00:00:00Z',
          'accussed_count': 1
        }]
      }
    }).should.eql('NETWORK');
  });
});
