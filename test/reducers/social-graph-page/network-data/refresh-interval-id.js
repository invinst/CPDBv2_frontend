import should from 'should';

import refreshIntervalId from 'reducers/social-graph-page/network-data/refresh-interval-id';
import { UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID } from 'utils/constants';


describe('refreshIntervalId reducer', function () {
  it('should have initial state', function () {
    should(refreshIntervalId(undefined, {})).be.null();
  });

  it('should handle UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID', function () {
    refreshIntervalId(null, {
      type: UPDATE_SOCIAL_GRAPH_REFRESH_INTERVAL_ID,
      payload: 1234
    }).should.eql(1234);
  });
});
