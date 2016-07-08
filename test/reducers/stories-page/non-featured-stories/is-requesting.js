import {
  NON_FEATURED_STORIES_REQUEST_START, NON_FEATURED_STORIES_REQUEST_SUCCESS, NON_FEATURED_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';
import isRequesting from 'reducers/stories-page/non-featured-stories/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_START', function () {
    isRequesting(undefined, {
      type: NON_FEATURED_STORIES_REQUEST_START
    }).should.be.true();
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: NON_FEATURED_STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle NON_FEATURED_STORIES_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: NON_FEATURED_STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
