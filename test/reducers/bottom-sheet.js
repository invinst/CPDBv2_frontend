import BottomSheetReducer from 'reducers/bottom-sheet';
import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ,
  OPEN_BOTTOM_SHEET_TO_CREATE_FAQ,
  OPEN_BOTTOM_SHEET_TO_CREATE_REPORT,
  CLOSE_BOTTOM_SHEET,
  REPORT_TYPE,
  FAQ_TYPE
 } from 'actions/bottom-sheet';


describe('BottomSheetReducer', function () {
  it('should return initial state', function () {
    BottomSheetReducer(undefined, {}).should.eql({ content: null });
  });

  it('should handle OPEN_BOTTOM_SHEET_WITH_REPORT', function () {
    BottomSheetReducer(undefined, {
      type: OPEN_BOTTOM_SHEET_WITH_REPORT,
      payload: 1
    }).should.eql({
      content: {
        type: REPORT_TYPE,
        id: 1
      }
    });
  });

  it('should handle OPEN_BOTTOM_SHEET_WITH_FAQ', function () {
    BottomSheetReducer(undefined, {
      type: OPEN_BOTTOM_SHEET_WITH_FAQ,
      payload: 2
    }).should.eql({
      content: {
        type: FAQ_TYPE,
        id: 2
      }
    });
  });

  it('should handle OPEN_BOTTOM_SHEET_TO_CREATE_FAQ', function () {
    BottomSheetReducer(undefined, {
      type: OPEN_BOTTOM_SHEET_TO_CREATE_FAQ
    }).should.eql({
      content: {
        type: FAQ_TYPE
      }
    });
  });

  it('should handle OPEN_BOTTOM_SHEET_TO_CREATE_REPORT', function () {
    BottomSheetReducer(undefined, {
      type: OPEN_BOTTOM_SHEET_TO_CREATE_REPORT
    }).should.eql({
      content: {
        type: REPORT_TYPE
      }
    });
  });

  it('should handle CLOSE_BOTTOM_SHEET', function () {
    BottomSheetReducer(undefined, {
      type: CLOSE_BOTTOM_SHEET,
      payload: undefined
    }).should.eql({ content: null });
  });
});
