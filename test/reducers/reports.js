import ReportFactory from 'utils/test/factories/report';
import reports from 'reducers/reports';
import {
  REPORTS_REQUEST_SUCCESS, UPDATE_REPORT_REQUEST_SUCCESS, REPORT_REQUEST_SUCCESS
} from 'actions/reporting-page';
import { RandomizedListFieldFactory } from 'utils/test/factories/field';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


describe('reports', function () {
  it('should return initial state', function () {
    reports(undefined, {}).should.eql({});
  });

  it('should handle REPORTS_REQUEST_SUCCESS', function () {
    const results = ReportFactory.buildList(2);
    reports(undefined, {
      type: REPORTS_REQUEST_SUCCESS,
      payload: { results }
    }).should.eql({
      [results[0].id]: results[0],
      [results[1].id]: results[1]
    });
  });

  it('should handle REPORT_REQUEST_SUCCESS', function () {
    const result = ReportFactory.build();
    reports(undefined, {
      type: REPORT_REQUEST_SUCCESS,
      payload: result
    }).should.eql({
      [result.id]: result
    });
  });

  it('should handle UPDATE_REPORT_REQUEST_SUCCESS', function () {
    const previousState = {
      1: {
        fields: 'previousField',
        id: 1
      }
    };
    reports(previousState, {
      type: UPDATE_REPORT_REQUEST_SUCCESS,
      payload: { id: 1, fields: 'newField' }
    }).should.eql({
      1: {
        id: 1,
        fields: 'newField'
      }
    });
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    const currentReportFactoryId = ReportFactory.build().id;
    const reportsField = RandomizedListFieldFactory.build({ name: 'reports' }, { subFactory: ReportFactory });
    reports(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [reportsField]
      }
    }).should.eql({
      [currentReportFactoryId + 1]: reportsField.value[0],
      [currentReportFactoryId + 2]: reportsField.value[1],
      [currentReportFactoryId + 3]: reportsField.value[2]
    });
  });
});
