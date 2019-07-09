import currentNetworkTab from 'reducers/social-graph-page/network-data/current-network-tab';
import { CHANGE_NETWORK_TAB, SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS } from 'utils/constants';


describe('currentNetworkTab reducer', function () {
  it('should have initial state', function () {
    currentNetworkTab(undefined, {}).should.eql('Timeline');
  });

  it('should handle CHANGE_NETWORK_TAB', function () {
    currentNetworkTab(undefined, {
      type: CHANGE_NETWORK_TAB,
      payload: 'Officers'
    }).should.eql('Officers');
  });

  describe('should handle SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS', function () {
    it('should return Officers if payload is empty', function () {
      currentNetworkTab('Timeline', {
        type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
        payload: []
      }).should.eql('Officers');
    });

    it('should return current state (Officers) if payload is not empty', function () {
      currentNetworkTab('Officers', {
        type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
        payload: [
          {
            'category': 'False Arrest',
            'crid': '1089128',
            'incident_date': '2018-02-01',
          }
        ]
      }).should.eql('Officers');
    });

    it('should return current state (Timeline) if payload is not empty', function () {
      currentNetworkTab('Timeline', {
        type: SOCIAL_GRAPH_ALLEGATIONS_REQUEST_SUCCESS,
        payload: [
          {
            'category': 'False Arrest',
            'crid': '1089128',
            'incident_date': '2018-02-01',
          }
        ]
      }).should.eql('Timeline');
    });
  });
});
