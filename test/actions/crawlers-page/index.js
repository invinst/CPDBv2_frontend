import { requestCrawlers } from 'actions/crawlers-page';
import {
  CRAWLERS_API_URL,
  CRAWLERS_REQUEST_START,
  CRAWLERS_REQUEST_SUCCESS,
  CRAWLERS_REQUEST_FAILURE,
} from 'utils/constants';


describe('crawlersPage actions', function () {
  describe('requestCrawlers', function () {
    it('should return the right action', function () {
      requestCrawlers({ limit: '20', offset: '20' }).should.eql({
        types: [CRAWLERS_REQUEST_START, CRAWLERS_REQUEST_SUCCESS, CRAWLERS_REQUEST_FAILURE],
        payload: {
          request: {
            url: CRAWLERS_API_URL,
            params: { limit: '20', offset: '20' },
            adapter: null
          }
        }
      });
    });
  });
});
