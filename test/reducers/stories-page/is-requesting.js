import {
  STORIES_PAGE_REQUEST_START, STORIES_PAGE_REQUEST_SUCCESS, STORIES_PAGE_REQUEST_FAILURE
} from 'actions/stories-page';
import isRequesting from 'reducers/stories-page/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle STORIES_PAGE_REQUEST_START', function () {
    isRequesting(undefined, {
      type: STORIES_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle STORIES_PAGE_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: STORIES_PAGE_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle STORIES_PAGE_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: STORIES_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
