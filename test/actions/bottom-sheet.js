import {
  openBottomSheetWithReport, closeBottomSheet, openBottomSheetWithFAQ, searchOfficers,
  OPEN_BOTTOM_SHEET_WITH_REPORT, CLOSE_BOTTOM_SHEET, OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/bottom-sheet';
import {
  V2_ROOT_PATH, SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE
} from 'utils/constants';


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

  describe('searchOfficers', function () {
    it('should return right action', function () {
      searchOfficers('Ke').should.eql({
        types: [SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${V2_ROOT_PATH}report-bottomsheet-officer-search/Ke/`,
            adapter: null,
            params: undefined
          }
        }
      });
    });
  });
});
