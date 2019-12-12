import should from 'should';

import refreshIntervalId from 'reducers/pinboard-page/refresh-interval-id';
import { UPDATE_PINBOARD_REFRESH_INTERVAL_ID } from 'utils/constants';


describe('refreshIntervalId reducer', function () {
  it('should have initial state', function () {
    should(refreshIntervalId(undefined, {})).be.null();
  });

  it('should handle UPDATE_PINBOARD_REFRESH_INTERVAL_ID', function () {
    refreshIntervalId(null, {
      type: UPDATE_PINBOARD_REFRESH_INTERVAL_ID,
      payload: 1234,
    }).should.eql(1234);
  });
});
