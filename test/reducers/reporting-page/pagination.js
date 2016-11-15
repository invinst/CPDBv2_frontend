import reportingPagePagination from 'reducers/reporting-page/pagination';
import {
  REPORTS_REQUEST_SUCCESS, REPORTS_REQUEST_FAILURE
} from 'actions/reporting-page';


describe('reportingPagePagination reducer', function () {
  it('should return initial state', function () {
    reportingPagePagination(undefined, {}).should.eql({ next: null, previous: null, count: 0 });
  });

  it('should return pagination on REPORTS_REQUEST_SUCCESS', function () {
    const next = 'next';
    const previous = 'previous';
    const count = 0;
    reportingPagePagination(undefined, {
      type: REPORTS_REQUEST_SUCCESS,
      payload: { next, previous, count }
    }).should.eql({ next, previous, count });
  });

  it('should return empty pagination on REPORTS_REQUEST_FAILURE', function () {
    reportingPagePagination(undefined, {
      type: REPORTS_REQUEST_FAILURE
    }).should.eql({ next: null, previous: null, count: 0 });
  });
});
