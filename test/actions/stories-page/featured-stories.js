import {
  requestStories, FEATURED_STORIES_REQUEST_START, FEATURED_STORIES_REQUEST_SUCCESS,
  FEATURED_STORIES_REQUEST_FAILURE, STORIES_API_URL
} from 'actions/stories-page/featured-stories';

describe('storiesPage actions', function () {
  describe('requestStories', function () {
    it('should return the right action', function () {
      requestStories().should.eql({
        types: [
          FEATURED_STORIES_REQUEST_START, FEATURED_STORIES_REQUEST_SUCCESS, FEATURED_STORIES_REQUEST_FAILURE
        ],
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
