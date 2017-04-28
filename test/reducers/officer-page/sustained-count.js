import sustainedCount from 'reducers/officer-page/sustained-count';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


describe('sustainedCount reducer', function () {
  it('should have initial state', function () {
    sustainedCount(undefined, {}).should.eql(0);
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    sustainedCount(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'complaint_records': { 'sustained_count': 1 } }
    }).should.eql(1);
  });
});
