import {
  requestStories, STORIES_API_URL,
  STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE
} from 'actions/landing-page/story-app';


describe('storyApp actions', function () {
  describe('requestStories', function () {
    it('should return the right action', function () {
      requestStories().should.eql({
        types: [STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE],
        payload: {
          request: {
            url: STORIES_API_URL,
            params: undefined,
            adapter: undefined
          }
        }
      });
    });
  });
});
