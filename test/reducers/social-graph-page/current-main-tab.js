import currentMainTab from 'reducers/social-graph-page/current-main-tab';
import { CHANGE_SOCIAL_GRAPH_MAIN_TAB } from 'utils/constants';


describe('currentMainTab reducer', function () {
  it('should have initial state', function () {
    currentMainTab(undefined, {}).should.eql('NETWORK');
  });

  it('should handle CHANGE_NETWORK_TAB', function () {
    currentMainTab(undefined, {
      type: CHANGE_SOCIAL_GRAPH_MAIN_TAB,
      payload: 'GEOGRAPHIC',
    }).should.eql('GEOGRAPHIC');
  });
});
