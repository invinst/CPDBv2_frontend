import officersSummaryRequesting from 'reducers/pinboard-page/widgets/officers-summary-requesting';
import {
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('officersSummaryRequesting reducer', function () {
  it('should have initial state', function () {
    officersSummaryRequesting(undefined, {}).should.be.false();
  });

  it('should handle PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START', function () {
    officersSummaryRequesting(
      false,
      { type: PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    officersSummaryRequesting(
      true,
      { type: PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS, payload: [] }
    ).should.be.false();
  });

  it('should handle PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    officersSummaryRequesting(
      true,
      { type: PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
