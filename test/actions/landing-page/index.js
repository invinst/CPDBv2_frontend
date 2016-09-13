import {
  requestLandingPage, LANDING_PAGE_API_URL,
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';


describe('requestLandingPage action', function () {
  it('should return correct action', function () {
    requestLandingPage().should.eql({
      types: [LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE],
      payload: {
        request: {
          url: LANDING_PAGE_API_URL,
          adapter: undefined,
          params: undefined
        }
      }
    });
  });
});
