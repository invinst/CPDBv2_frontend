import summary from 'reducers/officer-page/summary';

import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


describe('summary reducer', function () {
  it('should have initial state', function () {
    summary(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    summary(undefined, {
      type: OFFICER_SUMMARY_REQUEST_SUCCESS,
      payload: { 'a': 'b' }
    }).should.eql({ 'a': 'b' });
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    summary(undefined, {
      type: CHANGE_OFFICER_ID,
    }).should.eql({});
  });
});
