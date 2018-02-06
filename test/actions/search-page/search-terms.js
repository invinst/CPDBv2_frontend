import { requestSearchTermCategories } from 'actions/search-page/search-terms';
import {
  SEARCH_TERMS_CATEGORIES_REQUEST_START,
  SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
  SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE,
  SEARCH_TERM_CATEGORIES_API_URL,
} from 'utils/constants';


describe('search terms actions', function () {
  describe('requestSearchTermCategories', function () {
    it('should return correct action', function () {
      requestSearchTermCategories().should.deepEqual({
        types: [
          SEARCH_TERMS_CATEGORIES_REQUEST_START,
          SEARCH_TERMS_CATEGORIES_REQUEST_SUCCESS,
          SEARCH_TERMS_CATEGORIES_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: SEARCH_TERM_CATEGORIES_API_URL,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });
});
