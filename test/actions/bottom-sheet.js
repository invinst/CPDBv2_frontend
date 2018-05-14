import {
  openBottomSheetWithReport, closeBottomSheet, searchOfficers, openOfficerPage
} from 'actions/bottom-sheet';
import {
  OPEN_BOTTOM_SHEET_WITH_REPORT, CLOSE_BOTTOM_SHEET,
  V2_ROOT_PATH, SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE,
  OPEN_OFFICER_PAGE
} from 'utils/constants';


describe('bottomSheet actions', function () {
  describe('openBottomSheetWithReport', function () {
    it('should return right action', function () {
      openBottomSheetWithReport(3).should.eql({
        type: OPEN_BOTTOM_SHEET_WITH_REPORT,
        payload: 3
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

  describe('openOfficerPage', function () {
    it('should return right action', function () {
      openOfficerPage(3).should.eql({
        type: OPEN_OFFICER_PAGE,
        payload: 3
      });
    });
  });
});
