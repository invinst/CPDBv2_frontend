import {
  FEATURED_STORIES_REQUEST_START, FEATURED_STORIES_REQUEST_SUCCESS, FEATURED_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/featured-stories';
import storiesPage from 'reducers/stories-page/featured-stories';
import { PAGINATION_DEFAULT } from 'utils/constants';


describe('storiesPage reducer', function () {
  it('should return initial state', function () {
    storiesPage(undefined, {}).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false
    });
  });

  it('should handle FEATURED_STORIES_REQUEST_START', function () {
    storiesPage(undefined, {
      type: FEATURED_STORIES_REQUEST_START
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: true
    });
  });

  it('should handle FEATURED_STORIES_REQUEST_SUCCESS', function () {
    let nextState = storiesPage(undefined, {
      type: FEATURED_STORIES_REQUEST_START
    });

    storiesPage(nextState, {
      type: FEATURED_STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql({
      stories: [1, 2, 3],
      isRequesting: false
    });
  });

  it('should handle FEATURED_STORIES_REQUEST_FAILURE', function () {
    let nextState = storiesPage(undefined, {
      type: FEATURED_STORIES_REQUEST_START
    });

    storiesPage(nextState, {
      type: FEATURED_STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false
    });
  });
});
