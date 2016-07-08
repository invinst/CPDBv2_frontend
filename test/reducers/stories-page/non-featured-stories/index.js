import {
  NON_FEATURED_STORIES_REQUEST_START, NON_FEATURED_STORIES_REQUEST_SUCCESS, NON_FEATURED_STORIES_REQUEST_FAILURE,
  LOAD_MORE_STORIES_REQUEST_START, LOAD_MORE_STORIES_REQUEST_SUCCESS, LOAD_MORE_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';
import storiesPage from 'reducers/stories-page/non-featured-stories';
import { PAGINATION_DEFAULT } from 'utils/constants';


describe('storiesPage reducer', function () {
  it('should return initial state', function () {
    storiesPage(undefined, {}).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false,
      isLoadingMore: false
    });
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_START', function () {
    storiesPage(undefined, {
      type: NON_FEATURED_STORIES_REQUEST_START
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: true,
      isLoadingMore: false
    });
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_SUCCESS', function () {
    let nextState = storiesPage(undefined, {
      type: NON_FEATURED_STORIES_REQUEST_START
    });

    storiesPage(nextState, {
      type: NON_FEATURED_STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql({
      stories: [1, 2, 3],
      isRequesting: false,
      isLoadingMore: false
    });
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_FAILURE', function () {
    let nextState = storiesPage(undefined, {
      type: NON_FEATURED_STORIES_REQUEST_START
    });

    storiesPage(nextState, {
      type: NON_FEATURED_STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false,
      isLoadingMore: false
    });
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_START', function () {
    storiesPage(undefined, {
      type: LOAD_MORE_STORIES_REQUEST_START
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false,
      isLoadingMore: true
    });
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_SUCCESS', function () {
    let nextState = storiesPage(undefined, {
      type: LOAD_MORE_STORIES_REQUEST_START
    });

    storiesPage(nextState, {
      type: LOAD_MORE_STORIES_REQUEST_SUCCESS,
      payload: {
        count: 1,
        next: 'next',
        previous: 'previous',
        results: [1, 2, 3]
      }
    }).should.eql({
      stories: {
        count: 1,
        next: 'next',
        previous: 'previous',
        results: [1, 2, 3]
      },
      isRequesting: false,
      isLoadingMore: false
    });
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_FAILURE', function () {
    let nextState = storiesPage(undefined, {
      type: LOAD_MORE_STORIES_REQUEST_START
    });

    storiesPage(nextState, {
      type: LOAD_MORE_STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false,
      isLoadingMore: false
    });
  });
});
