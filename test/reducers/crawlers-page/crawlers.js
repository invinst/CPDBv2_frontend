import crawlers from 'reducers/crawlers-page/crawlers';

import { CRAWLERS_REQUEST_SUCCESS } from 'utils/constants';


describe('crawlers reducer', function () {
  it('should return initial state', function () {
    crawlers(undefined, {}).should.eql([]);
  });

  it('should handle CRAWLERS_REQUEST_SUCCESS with empty state', function () {
    crawlers([], {
      type: CRAWLERS_REQUEST_SUCCESS,
      payload: {
        results: [{
          'id': 111,
          'crawler_name': 'PORTAL_COPA',
          'num_documents': 15,
          'num_new_documents': 6,
          'recent_run_at': '2019-02-20'
        }]
      }
    }).should.eql([{
      'id': 111,
      'crawler_name': 'PORTAL_COPA',
      'num_documents': 15,
      'num_new_documents': 6,
      'recent_run_at': '2019-02-20'
    }]);
  });

  it('should handle CRAWLERS_REQUEST_SUCCESS non-empty state', function () {
    crawlers([{
      'id': 109,
      'crawler_name': 'SUMMARY_REPORTS_COPA',
      'num_documents': 5,
      'num_new_documents': 1,
      'recent_run_at': '2019-02-20'
    }, {
      'id': 110,
      'crawler_name': 'SUMMARY_REPORTS_COPA',
      'num_documents': 7,
      'num_new_documents': 2,
      'recent_run_at': '2019-02-20'
    }], {
      type: CRAWLERS_REQUEST_SUCCESS,
      payload: {
        results: [{
          'id': 111,
          'crawler_name': 'PORTAL_COPA',
          'num_documents': 15,
          'num_new_documents': 6,
          'recent_run_at': '2019-02-20'
        }]
      }
    }).should.eql([{
      'id': 109,
      'crawler_name': 'SUMMARY_REPORTS_COPA',
      'num_documents': 5,
      'num_new_documents': 1,
      'recent_run_at': '2019-02-20'
    }, {
      'id': 110,
      'crawler_name': 'SUMMARY_REPORTS_COPA',
      'num_documents': 7,
      'num_new_documents': 2,
      'recent_run_at': '2019-02-20'
    }, {
      'id': 111,
      'crawler_name': 'PORTAL_COPA',
      'num_documents': 15,
      'num_new_documents': 6,
      'recent_run_at': '2019-02-20'
    }]);
  });
});

