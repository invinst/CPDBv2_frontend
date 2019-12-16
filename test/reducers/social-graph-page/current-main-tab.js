import currentMainTab from 'reducers/social-graph-page/current-main-tab';
import { CHANGE_SOCIAL_GRAPH_MAIN_TAB, LOCATION_CHANGE } from 'utils/constants';


describe('currentMainTab reducer', function () {
  it('should have initial state', function () {
    currentMainTab(undefined, {}).should.eql('SOCIAL_GRAPH');
  });

  it('should handle CHANGE_NETWORK_TAB', function () {
    currentMainTab(undefined, {
      type: CHANGE_SOCIAL_GRAPH_MAIN_TAB,
      payload: 'GEOGRAPHIC',
    }).should.eql('GEOGRAPHIC');
  });

  it('should handle LOCATION_CHANGE', function () {
    currentMainTab('SOCIAL_GRAPH', {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/geographic/?unit_id=123',
      },
    }).should.eql('GEOGRAPHIC');
  });

  it('should handle LOCATION_CHANGE if tab name does not belong to DATA_VISUALIZATION_TAB_NAMES', function () {
    currentMainTab('SOCIAL_GRAPH', {
      type: LOCATION_CHANGE,
      payload: {
        pathname: '/officer/8562/jerome-finnigan/',
      },
    }).should.eql('SOCIAL_GRAPH');
  });
});
