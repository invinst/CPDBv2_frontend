import should from 'should';

import officerId from 'reducers/social-graph-page/network-data/officer-id';
import { UPDATE_OFFICER_ID } from 'utils/constants';


describe('officerId reducer', function () {
  it('should return initial state', function () {
    should(officerId(undefined, {})).be.null();
  });

  it('should handle UPDATE_OFFICER_ID', function () {
    officerId([], {
      type: UPDATE_OFFICER_ID,
      payload: 123
    }).should.eql(123);
  });
});

