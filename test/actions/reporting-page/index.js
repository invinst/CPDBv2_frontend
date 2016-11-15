import {
  requestReports, addReport, updateReport,
  REPORTS_REQUEST_START, REPORTS_REQUEST_SUCCESS, REPORTS_REQUEST_FAILURE, REPORTS_API_URL,
  ADD_REPORT_REQUEST_START, ADD_REPORT_REQUEST_SUCCESS, ADD_REPORT_REQUEST_FAILURE,
  UPDATE_REPORT_REQUEST_START, UPDATE_REPORT_REQUEST_SUCCESS, UPDATE_REPORT_REQUEST_FAILURE
} from 'actions/reporting-page';


describe('reportingPage actions', function () {
  describe('requestReports action', function () {
    it('should return correct action', function () {
      requestReports().should.eql({
        types: [REPORTS_REQUEST_START, REPORTS_REQUEST_SUCCESS, REPORTS_REQUEST_FAILURE],
        payload: {
          request: {
            url: REPORTS_API_URL,
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });

  describe('addReport action', function () {
    it('should return correct action', function () {
      const data = 'data';
      addReport(data).should.eql({
        types: [ADD_REPORT_REQUEST_START, ADD_REPORT_REQUEST_SUCCESS, ADD_REPORT_REQUEST_FAILURE],
        payload: {
          request: {
            url: REPORTS_API_URL,
            headers: {
              Authorization: null
            },
            adapter: undefined,
            method: 'POST',
            data: data
          }
        }
      });
    });
  });

  describe('updateReport action', function () {
    it('should return correct action', function () {
      const id = 1;
      const data = 'data';
      updateReport(id, data).should.eql({
        types: [UPDATE_REPORT_REQUEST_START, UPDATE_REPORT_REQUEST_SUCCESS, UPDATE_REPORT_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${REPORTS_API_URL}${id}/`,
            headers: {
              Authorization: null
            },
            adapter: undefined,
            method: 'PATCH',
            data: data
          }
        }
      });
    });
  });
});
