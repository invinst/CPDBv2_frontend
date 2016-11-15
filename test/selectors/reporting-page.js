import {
  nextParamsSelector, reportTransform, groupsSelector
} from 'selectors/reporting-page';
import ReportFactory from 'utils/test/factories/report';


describe('reportingPage selectors', function () {
  let state = {
    reportingPage: {}
  };

  beforeEach(function () {
    state.reportingPage = {};
  });

  describe('nextParamsSelector', function () {
    it('should return next params', function () {
      const search = 'search';
      const next = `http://google.com?search=${search}`;
      state.reportingPage = {
        pagination: { next }
      };

      nextParamsSelector(state).should.eql(search);
    });
  });

  describe('reportTransform', function () {
    it('should return transformed report', function () {
      const title = 'title';
      const publication = 'publication';
      const publishDate = '2016-11-07';

      const report = ReportFactory.build({}, {
        title, publication, publishDate
      });

      reportTransform(report).should.eql({
        id: report.id,
        title: title,
        publicationName: publication,
        publishDate: 'Nov 7, 2016'
      });
    });
  });

  describe('groupsSelector', function () {
    it('should return list of grouped reports', function () {
      const title = 'title';
      const publication = 'publication';
      state.reports = {
        1: ReportFactory.build({ id: 1 }, {
          title,
          publication,
          publishDate: '2016-11-06'
        })
      };
      state.reportingPage.reportGrouping = {
        groups: [
          { reports: [1] }
        ]
      };
      groupsSelector(state).should.eql([
        { reports: [{
          id: 1,
          title,
          publicationName: publication,
          publishDate: 'Nov 6, 2016'
        }] }
      ]);
    });
  });
});
