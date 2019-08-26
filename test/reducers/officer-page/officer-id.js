import officerId from 'reducers/officer-page/officer-id';
import should from 'should';

import {
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  CHANGE_OFFICER_ID,
} from 'utils/constants';


describe('officerId reducer', function () {
  it('should have initial state', function () {
    should.not.exists(officerId(undefined, {}));
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    officerId(null, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { id: 1234 },
    }).should.eql(1234);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    officerId(null, {
      type: CHANGE_OFFICER_ID,
      payload: 123,
    }).should.eql(123);
  });
});
