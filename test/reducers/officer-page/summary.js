import summary from 'reducers/officer-page/summary';

import { OFFICER_SUMMARY_REQUEST_SUCCESS } from 'utils/constants';


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
});
