import complaintSummariesIsRequesting from 'reducers/landing-page/complaint-summaries/is-requesting';
import * as constants from 'utils/constants';


describe('complaintSummariesIsRequesting reducer', function () {
  it('should return initial state', function () {
    complaintSummariesIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle RECENT_COMPLAINT_SUMMARIES_REQUEST_START', function () {
    complaintSummariesIsRequesting(undefined, {
      type: constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_START
    }).should.be.true();
  });

  it('should handle RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS', function () {
    complaintSummariesIsRequesting(true, {
      type: constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle RECENT_COMPLAINT_SUMMARIES_FAILURE', function () {
    complaintSummariesIsRequesting(true, {
      type: constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
