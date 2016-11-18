import {
  OPEN_BOTTOM_SHEET_WITH_REPORT, CLOSE_BOTTOM_SHEET, openBottomSheetWithReport, closeBottomSheet,
  openBottomSheetWithFAQ, OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/bottom-sheet';


describe('bottomSheet actions', function () {
  describe('openBottomSheetWithReport', function () {
    it('should return right action', function () {
      const report = {};
      openBottomSheetWithReport(report).should.eql({
        type: OPEN_BOTTOM_SHEET_WITH_REPORT,
        payload: report
      });
    });
  });

  describe('openBottomSheetWithFAQ', function () {
    it('should return right action', function () {
      const faq = {};
      openBottomSheetWithFAQ(faq).should.eql({
        type: OPEN_BOTTOM_SHEET_WITH_FAQ,
        payload: faq
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
