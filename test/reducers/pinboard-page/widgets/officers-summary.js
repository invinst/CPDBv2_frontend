import officersSummary from 'reducers/pinboard-page/widgets/officers-summary';
import {
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('officersSummary reducer', function () {
  const officersSummaryItems = {
    race: [
      { race: 'Black', percentage: 0.67 },
      { race: 'White', percentage: 0.14 },
    ],
    gender: [
      { gender: 'F', percentage: 0.49 },
      { gender: 'M', percentage: 0.47 },
    ],
  };

  it('should have initial state', function () {
    officersSummary(undefined, {}).should.eql({});
  });

  it('should handle PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START', function () {
    officersSummary(
      officersSummaryItems,
      { type: PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_START }
    ).should.eql({});
  });

  it('should handle PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    officersSummary(
      [],
      {
        type: PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_SUCCESS,
        payload: officersSummaryItems,
      }
    ).should.eql(officersSummaryItems);
  });

  it('should handle PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    officersSummary(
      officersSummaryItems,
      { type: PINBOARD_OFFICERS_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.eql({});
  });
});
