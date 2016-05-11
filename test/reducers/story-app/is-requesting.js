import { STORIES_REQUEST, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';
import isRequesting from 'reducers/story-app/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle STORIES_REQUEST', function () {
    isRequesting(undefined, {
      type: STORIES_REQUEST
    }).should.be.true();
  });

  it('should handle STORIES_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: STORIES_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle STORIES_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: STORIES_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
