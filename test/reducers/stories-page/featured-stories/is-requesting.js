import {
  FEATURED_STORIES_REQUEST_START, FEATURED_STORIES_REQUEST_SUCCESS, FEATURED_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/featured-stories';
import isRequesting from 'reducers/stories-page/featured-stories/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle FEATURED_STORIES_REQUEST_START', function () {
    isRequesting(undefined, {
      type: FEATURED_STORIES_REQUEST_START
    }).should.be.true();
  });

  it('should handle FEATURED_STORIES_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: FEATURED_STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle FEATURED_STORIES_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: FEATURED_STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
