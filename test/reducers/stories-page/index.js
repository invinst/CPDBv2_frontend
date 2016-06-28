import {
  STORIES_PAGE_REQUEST_START, STORIES_PAGE_REQUEST_SUCCESS, STORIES_PAGE_REQUEST_FAILURE
} from 'actions/stories-page';
import storiesPage from 'reducers/stories-page';
import { PAGINATION_DEFAULT } from 'utils/constants';


describe('storiesPage reducer', function () {
  it('should return initial state', function () {
    storiesPage(undefined, {}).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false
    });
  });

  it('should handle STORIES_PAGE_REQUEST_START', function () {
    storiesPage(undefined, {
      type: STORIES_PAGE_REQUEST_START
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: true
    });
  });

  it('should handle STORIES_PAGE_REQUEST_SUCCESS', function () {
    let nextState = storiesPage(undefined, {
      type: STORIES_PAGE_REQUEST_START
    });

    storiesPage(nextState, {
      type: STORIES_PAGE_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql({
      stories: [1, 2, 3],
      isRequesting: false
    });
  });

  it('should handle STORIES_PAGE_REQUEST_FAILURE', function () {
    let nextState = storiesPage(undefined, {
      type: STORIES_PAGE_REQUEST_START
    });

    storiesPage(nextState, {
      type: STORIES_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      stories: PAGINATION_DEFAULT,
      isRequesting: false
    });
  });
});
