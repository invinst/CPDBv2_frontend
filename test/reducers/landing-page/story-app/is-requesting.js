import {
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';
import isRequesting from 'reducers/landing-page/story-app/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_START', function () {
    isRequesting(undefined, {
      type: LANDING_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: LANDING_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
