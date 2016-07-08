import {
  NON_FEATURED_STORIES_REQUEST_SUCCESS, NON_FEATURED_STORIES_REQUEST_FAILURE,
  LOAD_MORE_STORIES_REQUEST_SUCCESS, LOAD_MORE_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';
import stories from 'reducers/stories-page/non-featured-stories/stories';
import { PAGINATION_DEFAULT } from 'utils/constants';
import PaginationFactory from 'utils/test/factories/pagination';


describe('stories reducer', function () {
  it('should return initial state', function () {
    stories(undefined, {}).should.eql(PAGINATION_DEFAULT);
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_SUCCESS', function () {
    const expectedStories = PaginationFactory.build({ results: [1, 2, 3] });
    stories(undefined, {
      type: NON_FEATURED_STORIES_REQUEST_SUCCESS,
      payload: expectedStories
    }).should.eql(expectedStories);
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_FAILURE', function () {
    stories(PaginationFactory.build(), {
      type: NON_FEATURED_STORIES_REQUEST_FAILURE
    }).should.eql(PAGINATION_DEFAULT);
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_SUCCESS', function () {
    const initialState = {
      count: 4,
      next: 'next',
      previous: 'previous',
      results: [1, 2]
    };

    const payload = {
      count: 4,
      next: 'newNext',
      previous: 'newPrevious',
      results: [3, 4]
    };

    const expectedNextState = {
      count: 4,
      next: 'newNext',
      previous: 'newPrevious',
      results: [1, 2, 3, 4]
    };

    stories(initialState, {
      type: LOAD_MORE_STORIES_REQUEST_SUCCESS,
      payload: payload
    }).should.deepEqual(expectedNextState);
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_FAILURE', function () {
    const initialState = {
      count: 4,
      next: 'next',
      previous: 'previous',
      results: [1, 2]
    };

    stories(initialState, {
      type: LOAD_MORE_STORIES_REQUEST_FAILURE
    }).should.deepEqual(initialState);
  });
});
