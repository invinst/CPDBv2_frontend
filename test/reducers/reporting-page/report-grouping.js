import reportingPageReportGrouping, { STRATEGY_RANDOM } from 'reducers/reporting-page/report-grouping';
import {
  REPORTS_REQUEST_SUCCESS
} from 'actions/reporting-page';


const defaultState = {
  groups: [], groupingStrategy: STRATEGY_RANDOM, existingReportIds: []
};

describe('reportingPageReportGrouping reducer', function () {
  it('should return initial state', function () {
    reportingPageReportGrouping(undefined, {}).should.eql(defaultState);
  });

  it('should return grouped reports on REPORTS_REQUEST_SUCCESS', function () {
    const newState = reportingPageReportGrouping(defaultState, {
      type: REPORTS_REQUEST_SUCCESS,
      payload: { results: [
        {
          id: 1
        }
      ] }
    });
    newState.groups.length.should.equal(1);
    const group = newState.groups[0];
    group.reports.should.deepEqual([1]);
    group.key.should.be.ok();
    group.reportsNo.should.equal(1);
    group.type.should.be.within(0, 1);
    group.reportType.should.be.within(0, 1);
    newState.existingReportIds.should.deepEqual([1]);
  });

  it('should only group new reports on REPORTS_REQUEST_SUCCESS', function () {
    const newState = reportingPageReportGrouping({
      groups: [{ reports: [1] }],
      groupingStrategy: STRATEGY_RANDOM,
      existingReportIds: [1]
    }, {
      type: REPORTS_REQUEST_SUCCESS,
      payload: { results: [
        {
          id: 1
        },
        {
          id: 2
        }
      ] }
    });
    newState.groups.length.should.equal(2);
    newState.existingReportIds.should.deepEqual([1, 2]);
    const group = newState.groups[1];
    group.reports.should.deepEqual([2]);
  });
});
