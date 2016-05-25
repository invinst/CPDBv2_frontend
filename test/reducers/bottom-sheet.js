import BottomSheetReducer from 'reducers/bottom-sheet';
import { OPEN_BOTTOM_SHEET, CLOSE_BOTTOM_SHEET } from 'actions/bottom-sheet';


describe('BottomSheetReducer', function () {
  it('should return initial state', function () {
    BottomSheetReducer(undefined, {}).should.eql({ open: false });
  });

  it('should handle OPEN_BOTTOM_SHEET', function () {
    BottomSheetReducer(undefined, {
      type: OPEN_BOTTOM_SHEET,
      payload: undefined
    }).should.eql({ open: true });
  });

  it('should handle CLOSE_BOTTOM_SHEET', function () {
    BottomSheetReducer(undefined, {
      type: CLOSE_BOTTOM_SHEET,
      payload: undefined
    }).should.eql({ open: false });
  });
});
