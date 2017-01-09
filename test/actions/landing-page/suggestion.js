import {
  getSuggestion, SUGGESTION_URL,
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
} from 'actions/landing-page/suggestion';


describe('suggestion action', function () {
  describe('getSuggestion', function () {
    it('should return correct action', function () {
      getSuggestion({
        text: 'abc'
      }).should.deepEqual({
        types: [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE],
        payload: {
          request: {
            url: SUGGESTION_URL,
            params: {
              text: 'abc'
            },
            adapter: null
          }
        }
      });
    });
  });
});
