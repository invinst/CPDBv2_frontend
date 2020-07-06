import complainantsSummary from 'reducers/pinboard-page/widgets/complainants-summary';
import {
  PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('complainantsSummary reducer', function () {
  const complainantsSummaryItems = {
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
    complainantsSummary(undefined, {}).should.eql({});
  });

  it('should handle PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_START', function () {
    complainantsSummary(
      complainantsSummaryItems,
      { type: PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_START }
    ).should.eql({});
  });

  it('should handle PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    complainantsSummary(
      [],
      {
        type: PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_SUCCESS,
        payload: complainantsSummaryItems,
      }
    ).should.eql(complainantsSummaryItems);
  });

  it('should handle PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    complainantsSummary(
      complainantsSummaryItems,
      { type: PINBOARD_COMPLAINANTS_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.eql({});
  });
});
