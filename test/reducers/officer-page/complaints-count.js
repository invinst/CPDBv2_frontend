import complaintsCount from 'reducers/officer-page/complaints-count';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


describe('complaintsCount reducer', function () {
  it('should have initial state', function () {
    complaintsCount(undefined, {}).should.eql(0);
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    complaintsCount(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'complaint_records': { 'count': 1 } }
    }).should.eql(1);
  });
});
