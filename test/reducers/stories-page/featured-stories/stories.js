import {
  FEATURED_STORIES_REQUEST_SUCCESS, FEATURED_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/featured-stories';
import stories from 'reducers/stories-page/featured-stories/stories';
import { PAGINATION_DEFAULT } from 'utils/constants';
import PaginationFactory from 'utils/test/factories/pagination';


describe('stories reducer', function () {
  it('should return initial state', function () {
    stories(undefined, {}).should.eql(PAGINATION_DEFAULT);
  });

  it('should handle FEATURED_STORIES_REQUEST_SUCCESS', function () {
    const expectedStories = PaginationFactory.build({ results: [1, 2, 3] });
    stories(undefined, {
      type: FEATURED_STORIES_REQUEST_SUCCESS,
      payload: expectedStories
    }).should.eql(expectedStories);
  });

  it('should handle FEATURED_STORIES_REQUEST_FAILURE', function () {
    stories(PaginationFactory.build(), {
      type: FEATURED_STORIES_REQUEST_FAILURE
    }).should.eql(PAGINATION_DEFAULT);
  });
});
