import { map, filter } from 'lodash';

import { buildReportGroups, CHECKER_BOARD_STRATEGY } from 'utils/report-group';
import ReportFactory from 'utils/test/factories/report';


describe('ReportGroupUtils', function () {
  describe('#buildReportGroups', function () {
    it('should build and returns report groups', function () {
      const reports = ReportFactory.buildList(4);
      const result = buildReportGroups(reports);

      result.length.should.equal(4);
      filter(result, obj => obj.key).length.should.equal(4);
      filter(result, obj => obj.reports.length === 1).length.should.equal(4);
      map(result, obj => obj.reports[0]).should.eql(reports);
    });

    it('should build and returns report groups with CHECKER_BOARD_STRATEGY strategy', function () {
      const reports = ReportFactory.buildList(8);
      const result = buildReportGroups(reports, CHECKER_BOARD_STRATEGY);

      result.length.should.equal(8);
      map(result, obj => obj.type).should.eql([1, 0, 1, 0, 1, 1, 0, 0]);
    });
  });
});
