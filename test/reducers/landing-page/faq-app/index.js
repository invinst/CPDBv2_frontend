import {
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';
import faqApp from 'reducers/landing-page/faq-app';


describe('faqApp reducer', function () {
  it('should return initial state', function () {
    faqApp(undefined, {}).should.eql({
      faqs: [],
      isRequesting: false
    });
  });

  it('should handle LANDING_PAGE_REQUEST_START', function () {
    faqApp(undefined, {
      type: LANDING_PAGE_REQUEST_START
    }).should.eql({
      faqs: [],
      isRequesting: true
    });
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    let nextState = faqApp(undefined, {
      type: LANDING_PAGE_REQUEST_START
    });

    faqApp(nextState, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: { faqs: [1, 2, 3] }
    }).should.eql({
      faqs: [1, 2, 3],
      isRequesting: false
    });
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    let nextState = faqApp(undefined, {
      type: LANDING_PAGE_REQUEST_START
    });

    faqApp(nextState, {
      type: LANDING_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      faqs: [],
      isRequesting: false
    });
  });
});
