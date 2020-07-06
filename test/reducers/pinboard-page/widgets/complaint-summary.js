import complaintSummary from 'reducers/pinboard-page/widgets/complaint-summary';
import {
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('complaintSummary reducer', function () {
  const complaintSummaryItems = [
    { category: 'Operation/Personnel Violations', count: 10 },
    { category: 'Use Of Force', count: 7 },
  ];

  it('should have initial state', function () {
    complaintSummary(undefined, {}).should.eql([]);
  });

  it('should handle PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START', function () {
    complaintSummary(
      complaintSummaryItems,
      { type: PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_START }
    ).should.eql([]);
  });

  it('should handle PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    complaintSummary(
      [],
      {
        type: PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_SUCCESS,
        payload: complaintSummaryItems,
      }
    ).should.eql(complaintSummaryItems);
  });

  it('should handle PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    complaintSummary(
      complaintSummaryItems,
      { type: PINBOARD_COMPLAINT_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.eql([]);
  });
});
