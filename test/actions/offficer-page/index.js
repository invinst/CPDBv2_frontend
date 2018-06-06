import { changeOfficerId, changeOfficerTab, fetchOfficerSummary } from 'actions/officer-page';
import {
  CHANGE_OFFICER_ID,
  CHANGE_OFFICER_TAB,
  OFFICER_SUMMARY_REQUEST_FAILURE,
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_URL,
} from 'utils/constants';


describe('officerPage actions', function () {
  describe('fetchOfficerSummary', function () {
    it('should return the right action', function () {
      fetchOfficerSummary(123).should.eql({
        types: [OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${OFFICER_URL}123/summary/`,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('changeOfficerId', function () {
    it('should return the right action', function () {
      changeOfficerId(123).should.eql({
        type: CHANGE_OFFICER_ID,
        payload: 123
      });
    });
  });

  describe('changeOfficerTab', function () {
    it('should return the right action', function () {
      changeOfficerTab('TIMELINE').should.eql({
        type: CHANGE_OFFICER_TAB,
        payload: 'TIMELINE'
      });
    });
  });
});
