import should from 'should';

import complaintsCount from 'reducers/officer-page/complaints-count';
import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


describe('complaintsCount reducer', function () {
  it('should have initial state', function () {
    should.not.exists(complaintsCount(undefined, {}));
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    complaintsCount(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'complaint_records': { 'count': 1 } }
    }).should.eql(1);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    should.not.exists(complaintsCount(10, {
      type: CHANGE_OFFICER_ID,
    }));
  });
});
