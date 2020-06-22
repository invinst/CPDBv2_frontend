import complaintSummaryRequesting from 'reducers/pinboard-page/widgets/complaint-summary-requesting';
import {
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('complaintSummaryRequesting reducer', function () {
  it('should have initial state', function () {
    complaintSummaryRequesting(undefined, {}).should.be.false();
  });

  it('should handle PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START', function () {
    complaintSummaryRequesting(
      false,
      { type: PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    complaintSummaryRequesting(
      true,
      { type: PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS, payload: [] }
    ).should.be.false();
  });

  it('should handle PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    complaintSummaryRequesting(
      true,
      { type: PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
