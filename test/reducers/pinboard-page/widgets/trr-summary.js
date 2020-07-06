import trrSummary from 'reducers/pinboard-page/widgets/trr-summary';
import {
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE,
} from 'utils/constants';


describe('trrSummary reducer', function () {
  const trrSummaryItems = [
    { 'force_type': 'Physical Force - Holding', 'count': 10 },
    { 'force_type': 'Taser', 'count': 7 },
  ];

  it('should have initial state', function () {
    trrSummary(undefined, {}).should.eql([]);
  });

  it('should handle PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START', function () {
    trrSummary(
      trrSummaryItems,
      { type: PINBOARD_TRR_SUMMARY_FETCH_REQUEST_START }
    ).should.eql([]);
  });

  it('should handle PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS', function () {
    trrSummary(
      [],
      { type: PINBOARD_TRR_SUMMARY_FETCH_REQUEST_SUCCESS, payload: trrSummaryItems }
    ).should.eql(trrSummaryItems);
  });

  it('should handle PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE', function () {
    trrSummary(
      trrSummaryItems,
      { type: PINBOARD_TRR_SUMMARY_FETCH_REQUEST_FAILURE }
    ).should.eql([]);
  });
});
