import {
  requestSearchTermCategories, selectCategory
} from 'actions/search-page/search-terms';
import * as constants from 'utils/constants';


describe('search terms actions', function () {
  describe('requestSearchTermCategories', function () {
    it('should return correct action', function () {
      requestSearchTermCategories().should.deepEqual({
        types: [
          constants.SEARCH_TERM_CATEGORIES_REQUEST_START,
          constants.SEARCH_TERM_CATEGORIES_REQUEST_SUCCESS,
          constants.SEARCH_TERM_CATEGORIES_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: constants.SEARCH_TERM_CATEGORIES_API_URL,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('selectCategory', function () {
    it('should return correct action', function () {
      selectCategory('police-districts').should.deepEqual({
        type: constants.SELECT_CATEGORY,
        payload: 'police-districts'
      });
    });
  });
});
