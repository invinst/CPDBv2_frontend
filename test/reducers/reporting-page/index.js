import reportingPage from 'reducers/reporting-page';
import { STRATEGY_RANDOM } from 'reducers/reporting-page/report-grouping';


describe('reportingPage reducer', function () {
  it('should return initial state', function () {
    reportingPage(undefined, {}).should.eql({
      isRequesting: false,
      reportGrouping: {
        groups: [],
        groupingStrategy: STRATEGY_RANDOM,
        existingReportIds: []
      },
      pagination: {
        next: null,
        previous: null,
        count: 0
      }
    });
  });
});
