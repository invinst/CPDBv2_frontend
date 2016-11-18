import ReportFactory from 'utils/test/factories/report';
import { RandomizedListFieldFactory } from 'utils/test/factories/field';
import reportSectionReports from 'reducers/landing-page/report-section/reports';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


describe('reportSectionReports reducer', function () {
  it('should return initial state', function () {
    reportSectionReports(undefined, {}).should.be.eql([]);
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    const currentReportFactoryId = ReportFactory.build().id;
    reportSectionReports(true, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [RandomizedListFieldFactory.build({ name: 'reports' }, { subFactory: ReportFactory })]
      }
    }).should.be.eql([currentReportFactoryId + 1, currentReportFactoryId + 2, currentReportFactoryId + 3]);
  });
});
