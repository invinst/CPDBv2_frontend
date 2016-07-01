import {
  requestStories, loadMoreStories, STORIES_API_URL,
  NON_FEATURED_STORIES_REQUEST_START, NON_FEATURED_STORIES_REQUEST_SUCCESS, NON_FEATURED_STORIES_REQUEST_FAILURE,
  LOAD_MORE_STORIES_REQUEST_START, LOAD_MORE_STORIES_REQUEST_SUCCESS, LOAD_MORE_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';

describe('storiesPage actions', function () {
  describe('requestStories', function () {
    it('should return the right action', function () {
      requestStories().should.eql({
        types: [
          NON_FEATURED_STORIES_REQUEST_START, NON_FEATURED_STORIES_REQUEST_SUCCESS, NON_FEATURED_STORIES_REQUEST_FAILURE
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

  describe('loadMoreStories', function () {
    it('should return the right action', function () {
      const nextUrl = 'next';

      loadMoreStories(nextUrl).should.eql({
        types: [
          LOAD_MORE_STORIES_REQUEST_START, LOAD_MORE_STORIES_REQUEST_SUCCESS, LOAD_MORE_STORIES_REQUEST_FAILURE
        ],
        payload: {
          request: {
            url: nextUrl,
            params: undefined,
            adapter: undefined
          }
        }
      });
    });
  });
});
