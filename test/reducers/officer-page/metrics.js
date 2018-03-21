import metrics from 'reducers/officer-page/metrics';
import { CHANGE_OFFICER_ID, OFFICER_METRICS_REQUEST_SUCCESS } from 'utils/constants';


describe('summary reducer', function () {
  it('should have initial state', function () {
    metrics(undefined, {}).should.eql({});
  });

  it('should handle OFFICER_SUMMARY_REQUEST_SUCCESS', function () {
    metrics(undefined, {
      type: OFFICER_METRICS_REQUEST_SUCCESS,
      payload: { 'a': 'b' }
    }).should.eql({ 'a': 'b' });
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    metrics(undefined, {
      type: CHANGE_OFFICER_ID,
    }).should.eql({});
  });
});
