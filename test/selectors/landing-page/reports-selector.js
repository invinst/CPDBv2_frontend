import { reportsSelector, dataAvailableSelector } from 'selectors/landing-page/reports-selector';
import ReportFactory from 'utils/test/factories/report';


describe('landingPageReports', function () {
  let state = {
    landingPage: {
      faqSection: {}
    },
    faqs: {}
  };

  beforeEach(function () {
    state.landingPage.faqSection = {};
  });

  describe('reportsSelector', function () {
    it('should return available faqs', function () {
      const title = 'title';
      const publication = 'publication';
      const publishDate = '2016-11-07';

      const report = ReportFactory.build({}, {
        title, publication, publishDate
      });

      state = {
        landingPage: {
          reportSection: {
            reports: [report.id]
          }
        },
        reports: {
          [report.id]: report
        }
      };

      reportsSelector(state).should.eql([{
        id: report.id,
        title: title,
        publicationName: publication,
        publishDate: 'Nov 7, 2016'
      }]);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.landingPage.reportSection = {
        reports: [1, 2, 3],
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has reports and requesting is false', function () {
      state.landingPage.reportSection = {
        isRequesting: false,
        reports: [1, 2, 3]
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when there are no reports', function () {
      state.landingPage.reportSection = {
        reports: []
      };
      dataAvailableSelector(state).should.be.false();
    });
  });
});
