import {
  crawlerTransform,
  crawlersSelector,
  nextParamsSelector,
  currentCrawler,
} from 'selectors/crawlers-page';


describe('Crawler page selectors', function () {
  describe('crawlerTransform', function () {
    it('should return crawler correctly', function () {
      const crawler = {
        'id': 111,
        'crawler_name': 'PORTAL_COPA',
        'status': 'Success',
        'num_documents': 15,
        'num_new_documents': 6,
        'recent_run_at': '2019-02-20',
        'num_successful_run': 1,
        'log_url': 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt',
      };
      crawlerTransform(crawler).should.eql({
        id: 111,
        crawlerName: 'PORTAL_COPA',
        status: 'Success',
        numDocuments: 15,
        numNewDocuments: 6,
        recentRunAt: '2019-02-20',
        numSuccessfulRun: 1,
        logUrl: 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt',
      });
    });
  });

  describe('crawlersSelector', function () {
    it('should return a list of correct crawlers', function () {
      const state = {
        crawlersPage: {
          crawlers: [{
            'id': 109,
            'crawler_name': 'SUMMARY_REPORTS_COPA',
            'status': 'Failed',
            'num_documents': 5,
            'num_new_documents': 1,
            'recent_run_at': '2019-02-19',
            'num_successful_run': 0,
            'log_url': 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt',
          }, {
            'id': 110,
            'crawler_name': 'SUMMARY_REPORTS_COPA',
            'status': 'Success',
            'num_documents': 7,
            'num_new_documents': 2,
            'recent_run_at': '2019-02-20',
            'num_successful_run': 1,
            'log_url': 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100331.txt',
          }, {
            'id': 111,
            'crawler_name': 'PORTAL_COPA',
            'status': 'Success',
            'num_documents': 15,
            'num_new_documents': 6,
            'recent_run_at': '2019-02-20',
            'num_successful_run': 1,
            'log_url': 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100332.txt',
          }],
        },
      };
      crawlersSelector(state).should.eql([{
        id: 109,
        crawlerName: 'SUMMARY_REPORTS_COPA',
        status: 'Failed',
        numDocuments: 5,
        numNewDocuments: 1,
        recentRunAt: '2019-02-19',
        numSuccessfulRun: 0,
        logUrl: 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt',
      }, {
        id: 110,
        crawlerName: 'SUMMARY_REPORTS_COPA',
        status: 'Success',
        numDocuments: 7,
        numNewDocuments: 2,
        recentRunAt: '2019-02-20',
        numSuccessfulRun: 1,
        logUrl: 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100331.txt',
      }, {
        id: 111,
        crawlerName: 'PORTAL_COPA',
        status: 'Success',
        numDocuments: 15,
        numNewDocuments: 6,
        recentRunAt: '2019-02-20',
        numSuccessfulRun: 1,
        logUrl: 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100332.txt',
      }]);
    });
  });

  describe('nextParamsSelector', function () {
    it('should return nextParams correctly', function () {
      const state = {
        crawlersPage: {
          pagination: {
            next: 'https://lvh.me/document-crawlers/?limit=20&offset=20',
          },
        },
      };
      nextParamsSelector(state).should.eql({ limit: '20', offset: '20' });
    });
  });

  describe('currentCrawler', function () {
    it('should return the correct current crawler', function () {
      const state = {
        crawlersPage: {
          crawlers: [{
            'id': 109,
            'crawler_name': 'SUMMARY_REPORTS_COPA',
            'status': 'Failed',
            'num_documents': 5,
            'num_new_documents': 1,
            'recent_run_at': '2019-02-19',
            'num_successful_run': 0,
            'log_url': 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt',
          }, {
            'id': 110,
            'crawler_name': 'SUMMARY_REPORTS_COPA',
            'status': 'Success',
            'num_documents': 7,
            'num_new_documents': 2,
            'recent_run_at': '2019-02-20',
            'num_successful_run': 1,
            'log_url': 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100331.txt',
          }, {
            'id': 111,
            'crawler_name': 'PORTAL_COPA',
            'status': 'Success',
            'num_documents': 15,
            'num_new_documents': 6,
            'recent_run_at': '2019-02-20',
            'num_successful_run': 1,
            'log_url': 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100332.txt',
          }],
          currentCrawlerId: 111,
        },
      };
      currentCrawler(state).should.eql({
        id: 111,
        crawlerName: 'PORTAL_COPA',
        status: 'Success',
        numDocuments: 15,
        numNewDocuments: 6,
        recentRunAt: '2019-02-20',
        numSuccessfulRun: 1,
        logUrl: 'https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100332.txt',
      });
    });
  });
});
