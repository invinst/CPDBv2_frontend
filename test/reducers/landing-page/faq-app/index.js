import { FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE } from 'actions/landing-page/faq-app';
import faqApp from 'reducers/landing-page/faq-app';
import { PAGINATION_DEFAULT } from 'utils/constants';


describe('faqApp reducer', function () {
  it('should return initial state', function () {
    faqApp(undefined, {}).should.eql({
      faqs: PAGINATION_DEFAULT,
      isRequesting: false
    });
  });

  it('should handle FAQS_REQUEST_START', function () {
    faqApp(undefined, {
      type: FAQS_REQUEST_START
    }).should.eql({
      faqs: PAGINATION_DEFAULT,
      isRequesting: true
    });
  });

  it('should handle FAQS_REQUEST_SUCCESS', function () {
    let nextState = faqApp(undefined, {
      type: FAQS_REQUEST_START
    });

    faqApp(nextState, {
      type: FAQS_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql({
      faqs: [1, 2, 3],
      isRequesting: false
    });
  });

  it('should handle FAQS_REQUEST_FAILURE', function () {
    let nextState = faqApp(undefined, {
      type: FAQS_REQUEST_START
    });

    faqApp(nextState, {
      type: FAQS_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.eql({
      faqs: PAGINATION_DEFAULT,
      isRequesting: false
    });
  });
});
