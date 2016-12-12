import {
  getSuggestion, selectTag, SUGGESTION_URL, SELECT_TAG,
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
} from 'actions/landing-page/suggestion';


describe('suggestion action', function () {
  describe('getSuggestion', function () {
    it('should return correct action', function () {
      getSuggestion('abc', {
        contentType: 'xyz'
      }).should.deepEqual({
        types: [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${SUGGESTION_URL}abc/`,
            params: {
              contentType: 'xyz'
            },
            adapter: null
          }
        }
      });
    });
  });

  describe('selectTag', function () {
    it('should return correct action', function () {
      selectTag('abc').should.deepEqual({
        type: SELECT_TAG,
        payload: 'abc'
      });
    });
  });
});
