import {
  LOAD_MORE_STORIES_REQUEST_START, LOAD_MORE_STORIES_REQUEST_SUCCESS, LOAD_MORE_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';
import isLoadingMore from 'reducers/stories-page/non-featured-stories/is-loading-more';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isLoadingMore(undefined, {}).should.be.false();
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_START', function () {
    isLoadingMore(undefined, {
      type: LOAD_MORE_STORIES_REQUEST_START
    }).should.be.true();
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_SUCCESS', function () {
    isLoadingMore(true, {
      type: LOAD_MORE_STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle LOAD_MORE_STORIES_REQUEST_FAILURE', function () {
    isLoadingMore(true, {
      type: LOAD_MORE_STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
