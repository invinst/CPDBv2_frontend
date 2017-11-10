import should from 'should';

import sustainedCount from 'reducers/officer-page/sustained-count';

import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


describe('sustainedCount reducer', function () {
  it('should have initial state', function () {
    should.not.exists(sustainedCount(undefined, {}));
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    sustainedCount(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'complaint_records': { 'sustained_count': 1 } }
    }).should.eql(1);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    should.not.exists(sustainedCount(undefined, {
      type: CHANGE_OFFICER_ID,
    }));
  });
});
