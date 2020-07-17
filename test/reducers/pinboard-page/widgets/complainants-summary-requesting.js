import complainantsSummaryRequesting from 'reducers/pinboard-page/widgets/complainants-summary-requesting';
import {
  PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('complainantsSummaryRequesting reducer', function () {
  it('should have initial state', function () {
    complainantsSummaryRequesting(undefined, {}).should.be.false();
  });

  it('should handle PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_START', function () {
    complainantsSummaryRequesting(
      false,
      { type: PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    complainantsSummaryRequesting(
      true,
      { type: PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_SUCCESS, payload: [] }
    ).should.be.false();
  });

  it('should handle PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    complainantsSummaryRequesting(
      true,
      { type: PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
