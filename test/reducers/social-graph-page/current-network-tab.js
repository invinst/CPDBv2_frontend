import currentNetworkTab from 'reducers/social-graph-page/current-network-tab';
import { CHANGE_NETWORK_TAB } from 'utils/constants';


describe('currentNetworkTab reducer', function () {
  it('should have initial state', function () {
    currentNetworkTab(undefined, {}).should.eql('Officers');
  });

  it('should handle CHANGE_NETWORK_TAB', function () {
    currentNetworkTab(undefined, {
      type: CHANGE_NETWORK_TAB,
      payload: 'Timeline'
    }).should.eql('Timeline');
  });
});
