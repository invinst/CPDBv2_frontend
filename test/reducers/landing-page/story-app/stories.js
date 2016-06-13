import { STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/landing-page/story-app';
import stories from 'reducers/landing-page/story-app/stories';
import { PAGINATION_DEFAULT } from 'utils/constants';
import PaginationFactory from 'utils/test/factories/pagination';


describe('stories reducer', function () {
  it('should return initial state', function () {
    stories(undefined, {}).should.eql(PAGINATION_DEFAULT);
  });

  it('should handle STORIES_REQUEST_SUCCESS', function () {
    const expectedStories = PaginationFactory.build({ results: [1, 2, 3] });
    stories(undefined, {
      type: STORIES_REQUEST_SUCCESS,
      payload: expectedStories
    }).should.eql(expectedStories);
  });

  it('should handle STORIES_REQUEST_FAILURE', function () {
    stories(PaginationFactory.build(), {
      type: STORIES_REQUEST_FAILURE
    }).should.eql(PAGINATION_DEFAULT);
  });
});
