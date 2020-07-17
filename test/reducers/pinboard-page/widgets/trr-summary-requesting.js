import trrSummaryRequesting from 'reducers/pinboard-page/widgets/trr-summary-requesting';
import {
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('trrSummaryRequesting reducer', function () {
  it('should have initial state', function () {
    trrSummaryRequesting(undefined, {}).should.be.false();
  });

  it('should handle PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START', function () {
    trrSummaryRequesting(
      false,
      { type: PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    trrSummaryRequesting(
      true,
      {
        type: PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
        payload: [],
      }
    ).should.be.false();
  });

  it('should handle PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    trrSummaryRequesting(
      true,
      { type: PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
