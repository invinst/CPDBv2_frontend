import {
  OPEN_BOTTOM_SHEET, CLOSE_BOTTOM_SHEET, openBottomSheet, closeBottomSheet
} from 'actions/bottom-sheet';


describe('bottomSheet actions', function () {
  describe('openBottomSheet', function () {
    it('should return right action', function () {
      openBottomSheet().should.eql({
        type: OPEN_BOTTOM_SHEET,
        payload: undefined
      });
    });
  });

  describe('closeBottomSheet', function () {
    it('should return right action', function () {
      closeBottomSheet().should.eql({
        type: CLOSE_BOTTOM_SHEET,
        payload: undefined
      });
    });
  });
});
