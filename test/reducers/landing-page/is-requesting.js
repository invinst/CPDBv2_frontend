import {
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';
import landingPageIsRequesting from 'reducers/landing-page/is-requesting';


describe('landingPageIsRequesting reducer', function () {
  it('should return initial state', function () {
    landingPageIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_START', function () {
    landingPageIsRequesting(undefined, {
      type: LANDING_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    landingPageIsRequesting(true, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    landingPageIsRequesting(true, {
      type: LANDING_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
