import {
  requestStories, STORIES_PAGE_REQUEST_START, STORIES_PAGE_REQUEST_SUCCESS, STORIES_PAGE_REQUEST_FAILURE,
  STORIES_API_URL
} from 'actions/stories-page';

describe('storiesPage actions', function () {
  describe('requestStories', function () {
    it('should return the right action', function () {
      requestStories().should.eql({
        types: [STORIES_PAGE_REQUEST_START, STORIES_PAGE_REQUEST_SUCCESS, STORIES_PAGE_REQUEST_FAILURE],
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
