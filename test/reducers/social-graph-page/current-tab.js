import currentTab from 'reducers/social-graph-page/current-tab';
import { CHANGE_SOCIAL_GRAPH_TAB } from 'utils/constants';


describe('currentTab reducer', function () {
  it('should have initial state', function () {
    currentTab(undefined, {}).should.eql('Officers');
  });

  it('should handle CHANGE_SOCIAL_GRAPH_TAB', function () {
    currentTab(undefined, {
      type: CHANGE_SOCIAL_GRAPH_TAB,
      payload: 'Timeline'
    }).should.eql('Timeline');
  });
});
